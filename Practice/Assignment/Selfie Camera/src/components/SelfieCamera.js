import React, { useState, useRef, useEffect } from 'react';
import './SelfieCamera.css';

/**
 * SelfieCamera Component
 * Implements camera functionality using WebRTC getUserMedia API
 * Features:
 * - Camera access and preview
 * - Image capture functionality
 * - Gallery of captured images
 * - Camera controls (start/stop)
 */
const SelfieCamera = () => {
  // State variables
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImages, setCapturedImages] = useState([]);
  const [error, setError] = useState('');
  const [cameraPermission, setCameraPermission] = useState('prompt');
  const [isLoading, setIsLoading] = useState(false);
  const [devices, setDevices] = useState([]);            // Available video input devices
  const [selectedDeviceId, setSelectedDeviceId] = useState(''); // Chosen device id
  const [debugInfo, setDebugInfo] = useState({});        // Live debug data
  const [attempts, setAttempts] = useState(0);           // Retry attempts
  const [showDebug, setShowDebug] = useState(false);     // Toggle debug panel
  const [fallbackImages, setFallbackImages] = useState([]); // Fallback uploaded selfies

  // Refs for video and canvas elements
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  /**
   * Request camera permission and start video stream
   */
  const startCamera = async () => {
    setIsLoading(true);
    setError('');
    setAttempts(a => a + 1);

    try {
      // Enumerate devices (permission might be needed first)
      const enumerate = async () => {
        try {
          const allDevices = await navigator.mediaDevices.enumerateDevices();
          const videoDevices = allDevices.filter(d => d.kind === 'videoinput');
          setDevices(videoDevices);
          if (!selectedDeviceId && videoDevices.length) {
            setSelectedDeviceId(videoDevices[0].deviceId);
          }
        } catch (e) {
          console.warn('Enumerate devices failed (can be normal before permission):', e);
        }
      };
      await enumerate();

      const constraints = {
        video: selectedDeviceId ? { deviceId: { exact: selectedDeviceId } } : { facingMode: 'user' },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      // Re-enumerate now that we (likely) have permission so labels populate
      setTimeout(() => navigator.mediaDevices.enumerateDevices().then(all => {
        const vids = all.filter(d => d.kind === 'videoinput');
        setDevices(vids);
      }).catch(()=>{}), 500);
      streamRef.current = stream;

      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = stream;

        // Poll for readiness (some environments never fire loadeddata inside embedded webviews)
        const startTime = performance.now();
        const timeoutMs = 10000;

        const poll = () => {
          if (!videoRef.current) return;
          const ready = video.videoWidth > 0 && video.videoHeight > 0;
          const track = stream.getVideoTracks()[0];
          setDebugInfo({
            width: video.videoWidth,
            height: video.videoHeight,
            readyState: video.readyState,
            paused: video.paused,
            elapsed: Math.round(performance.now() - startTime),
            trackReadyState: track?.readyState,
            trackMuted: track?.muted,
            settings: track?.getSettings ? track.getSettings() : {},
            constraints: track?.getConstraints ? track.getConstraints() : {},
            label: track?.label
          });
          if (ready) {
            setIsStreaming(true);
            setCameraPermission('granted');
            setIsLoading(false);
            return;
          }
          if (performance.now() - startTime > timeoutMs) {
            setError('Timed out waiting for camera. Try selecting a different device or open in external browser.');
            setIsLoading(false);
            return;
          }
          requestAnimationFrame(poll);
        };

        // Try play (must be user gesture - startCamera is button handler)
        video.play().catch(e => {
          console.warn('Play error (might still recover):', e);
        }).finally(() => {
          requestAnimationFrame(poll);
        });
      }
    } catch (err) {
      console.error('Camera access error:', err);
      if (err.name === 'NotAllowedError') {
        setError('Permission denied. Grant camera access in browser settings and retry.');
        setCameraPermission('denied');
      } else if (err.name === 'NotFoundError' || err.message?.includes('finding')) {
        setError('No camera detected. Plug in a webcam or use a device with a camera.');
      } else if (err.name === 'OverconstrainedError') {
        setError('Selected device/constraints unsupported. Try another camera.');
      } else if (err.name === 'NotReadableError') {
        setError('Camera busy (used by another app). Close other apps (Zoom, Teams, etc.).');
      } else {
        setError('Unexpected error: ' + (err.message || err.name));
      }
      setIsLoading(false);
    }
  };

  /**
   * Stop the camera stream and cleanup
   */
  const stopCamera = () => {
    if (streamRef.current) {
      // Stop all tracks in the stream
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsStreaming(false);
  };

  /**
   * Capture image from video stream
   */
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) {
      setError('Camera not ready. Please try again.');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Check if video is actually playing and has dimensions
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      setError('Video not ready. Please wait for camera to load completely.');
      return;
    }

    if (video.paused || video.ended) {
      setError('Video is not playing. Please restart the camera.');
      return;
    }

    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Save the current context state
    context.save();

    // For selfie effect, flip the image horizontally
    context.scale(-1, 1);
    context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);

    // Restore the context state
    context.restore();

    // Convert canvas to image data URL with high quality
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.95);
    
    // Validate that we actually captured something
    if (imageDataUrl === 'data:,') {
      setError('Failed to capture image. Please try again.');
      return;
    }
    
    // Create image object with metadata
    const newImage = {
      id: Date.now(),
      dataUrl: imageDataUrl,
      timestamp: new Date().toLocaleString(),
      dimensions: {
        width: canvas.width,
        height: canvas.height
      }
    };

    // Add to captured images array
    setCapturedImages(prev => [newImage, ...prev]);
    
    // Show success feedback
    setError('');
    console.log('Image captured successfully:', newImage.dimensions);
    
    // Visual feedback for capture
    if (videoRef.current) {
      videoRef.current.style.filter = 'brightness(1.5)';
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.style.filter = 'none';
        }
      }, 200);
    }
  };

  /**
   * Delete a captured image
   */
  const deleteImage = (imageId) => {
    setCapturedImages(prev => prev.filter(img => img.id !== imageId));
  };

  /**
   * Download a captured image
   */
  const downloadImage = (image) => {
    const link = document.createElement('a');
    link.download = `selfie-${image.timestamp.replace(/[/:,\s]/g, '-')}.jpg`;
    link.href = image.dataUrl;
    link.click();
  };

  /**
   * Clear all captured images
   */
  const clearAllImages = () => {
    if (window.confirm('Are you sure you want to delete all captured images?')) {
      setCapturedImages([]);
    }
  };

  /**
   * Cleanup on component unmount
   */
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  /**
   * Check for camera support
   */
  const isCameraSupported = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  };

  /**
   * Simple camera test to verify access
   */
  const testCameraAccess = async () => {
    try {
      console.log('Testing camera access...');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log('Camera access successful:', stream);
      
      // Stop the test stream
      stream.getTracks().forEach(track => track.stop());
      
      setError('Camera test successful! Now starting full camera...');
      setTimeout(() => startCamera(), 1000);
    } catch (err) {
      console.error('Camera test failed:', err);
      setError(`Camera test failed: ${err.message}`);
    }
  };

  /**
   * Debug camera status
   */
  const debugCameraStatus = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      console.log('Video debug info:', {
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
        paused: video.paused,
        ended: video.ended,
        readyState: video.readyState,
        srcObject: !!video.srcObject
      });
    }
  };

  /**
   * Attempt automatic start on first mount if permission already granted
   */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (navigator.permissions) {
        try {
          const status = await navigator.permissions.query({ name: 'camera' });
            status.onchange = () => setCameraPermission(status.state);
          if (status.state === 'granted' && !cancelled && !isStreaming && attempts === 0) {
            startCamera();
          }
        } catch (_) {
          // Some browsers may not support 'camera' permission query yet
        }
      }
    })();
    return () => { cancelled = true; };
  }, [attempts, isStreaming]);

  // Periodically refresh track diagnostics while streaming
  useEffect(() => {
    if (!isStreaming || !videoRef.current) return;
    let raf; const update = () => {
      const video = videoRef.current;
      const track = streamRef.current?.getVideoTracks?.()[0];
      setDebugInfo(info => ({
        ...info,
        width: video?.videoWidth || 0,
        height: video?.videoHeight || 0,
        readyState: video?.readyState,
        paused: video?.paused,
        timestamp: Date.now(),
        trackReadyState: track?.readyState,
        trackMuted: track?.muted,
        settings: track?.getSettings ? track.getSettings() : info.settings,
        label: track?.label || info.label
      }));
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [isStreaming]);

  // Fallback: handle file input capture (mobile browsers open camera UI)
  const handleFallbackFile = (e) => {
    const files = Array.from(e.target.files || []);
    const newItems = files.map(f => ({
      id: Date.now() + Math.random(),
      dataUrl: URL.createObjectURL(f),
      timestamp: new Date().toLocaleString(),
      dimensions: { width: null, height: null },
      fileName: f.name
    }));
    setFallbackImages(prev => [...newItems, ...prev]);
  };

  // Render camera not supported message
  if (!isCameraSupported()) {
    return (
      <div className="camera-container">
        <div className="error-message">
          <h3>Camera Not Supported</h3>
          <p>Your browser doesn't support camera access. Please use a modern browser like Chrome, Firefox, or Safari.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="camera-container">
      {/* Camera Controls */}
  <div className="camera-controls">
        {!isStreaming ? (
          <div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button 
                className="control-btn start-btn" 
                onClick={startCamera}
                disabled={isLoading}
              >
                {isLoading ? '📷 Starting Camera...' : '📷 Start Camera'}
              </button>
              <button 
                className="control-btn" 
                onClick={testCameraAccess}
                disabled={isLoading}
                style={{ background: '#2196F3' }}
              >
                🔧 Test Camera
              </button>
              {devices.length > 1 && (
                <select
                  value={selectedDeviceId}
                  onChange={e => setSelectedDeviceId(e.target.value)}
                  disabled={isLoading}
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
                >
                  {devices.map(d => (
                    <option key={d.deviceId} value={d.deviceId}>{d.label || `Camera ${d.deviceId.slice(-4)}`}</option>
                  ))}
                </select>
              )}
              {isLoading && (
                <button 
                  className="control-btn" 
                  onClick={() => {
                    setIsLoading(false);
                    setError('Camera initialization cancelled.');
                    stopCamera();
                  }}
                  style={{ background: '#ff9800' }}
                >
                  ❌ Cancel
                </button>
              )}
              <button 
                className="control-btn" 
                onClick={() => setShowDebug(s => !s)}
                style={{ background: '#6d4caf' }}
              >
                {showDebug ? '🧪 Hide Debug' : '🧪 Show Debug'}
              </button>
              <label style={{ cursor: 'pointer' }} className="control-btn" htmlFor="fallbackInput">
                📁 Upload / Mobile Capture
              </label>
              <input id="fallbackInput" type="file" accept="image/*" capture="user" multiple onChange={handleFallbackFile} style={{ display: 'none' }} />
            </div>
            {devices.length === 0 && !isLoading && (
              <p style={{ marginTop: '8px', fontSize: '0.85rem', color: '#555' }}>No cameras listed yet. Start or test to request permission.</p>
            )}
          </div>
        ) : (
          <div className="active-controls">
            <button 
              className="control-btn capture-btn" 
              onClick={captureImage}
            >
              📸 Capture Selfie
            </button>
            <button 
              className="control-btn stop-btn" 
              onClick={stopCamera}
            >
              ⏹️ Stop Camera
            </button>
            <button 
              className="control-btn debug-btn" 
              onClick={debugCameraStatus}
              style={{ background: '#9c27b0', fontSize: '0.9rem', padding: '10px 15px' }}
            >
              🔍 Debug
            </button>
          </div>
        )}
      </div>

      {/* Error Display */}
      {(error || showDebug) && (
        <div className="error-message" style={{ maxHeight: showDebug ? '400px' : 'auto', overflow: 'auto' }}>
          {error && <p style={{ fontWeight: 600 }}>{error}</p>}
          {showDebug && (
            <>
              <p style={{ marginTop: '6px', fontSize: '.8rem' }}>Debug / Diagnostics</p>
              <pre style={{ textAlign: 'left', fontSize: '0.65rem', lineHeight: 1.2, background: '#111', color: '#0f0', padding: '8px', borderRadius: '6px', overflowX: 'auto' }}>{JSON.stringify({
                permission: cameraPermission,
                attempts,
                devices: devices.map(d => ({ id: d.deviceId.slice(-6), label: d.label })),
                selectedDeviceId: selectedDeviceId && selectedDeviceId.slice(-6),
                debugInfo
              }, null, 2)}</pre>
              <p style={{ fontSize: '.65rem' }}>If width & height stay 0: likely blocked by embedding or permission denied. Open in external browser window.</p>
            </>
          )}
          {!isLoading && !isStreaming && attempts > 0 && (
            <button className="control-btn" onClick={startCamera} style={{ marginTop: '8px' }}>🔁 Retry</button>
          )}
        </div>
      )}

      {/* Camera Preview */}
      <div className="camera-preview">
  {isStreaming && (
          <div className="video-container">
            <video
              ref={videoRef}
              className="video-preview"
              autoPlay
              playsInline
              muted
              controls={false}
              style={{
                transform: 'scaleX(-1)', // Mirror effect for selfie
                objectFit: 'cover',
                backgroundColor: '#000'
              }}
              onLoadStart={() => console.log('Video load started')}
              onLoadedData={() => console.log('Video data loaded')}
              onCanPlay={() => console.log('Video can play')}
              onPlaying={() => console.log('Video is playing')}
            />
            <div className="camera-overlay">
              <div className="camera-frame"></div>
            </div>
          </div>
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="loading-indicator">
            <p>📷 Initializing camera...</p>
            <small>
              {attempts === 1 ? 'If this hangs more than 10s, click Cancel then Test Camera or open in external browser (embedded preview may block camera).'
                : 'Still trying... you can change camera or retry.'}
            </small>
            {debugInfo && (
              <pre style={{ textAlign: 'left', fontSize: '0.65rem', marginTop: '8px', opacity: 0.7 }}>{JSON.stringify(debugInfo, null, 2)}</pre>
            )}
          </div>
        )}
        
        {/* Hidden canvas for image capture */}
        <canvas
          ref={canvasRef}
          className="hidden-canvas"
          style={{ display: 'none' }}
        />
      </div>

      {/* Gallery Section */}
      {capturedImages.length > 0 && (
        <div className="gallery-section">
          <div className="gallery-header">
            <h3>📱 Captured Selfies ({capturedImages.length})</h3>
            <button 
              className="clear-all-btn"
              onClick={clearAllImages}
            >
              🗑️ Clear All
            </button>
          </div>
          
          <div className="gallery-grid">
            {capturedImages.map((image) => (
              <div key={image.id} className="gallery-item">
                <img
                  src={image.dataUrl}
                  alt={`Selfie taken on ${image.timestamp}`}
                  className="gallery-image"
                />
                <div className="gallery-overlay">
                  <div className="gallery-info">
                    <p className="timestamp">{image.timestamp}</p>
                    <p className="dimensions">
                      {image.dimensions.width} × {image.dimensions.height}
                    </p>
                  </div>
                  <div className="gallery-actions">
                    <button
                      className="action-btn download-btn"
                      onClick={() => downloadImage(image)}
                      title="Download Image"
                    >
                      💾
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => deleteImage(image.id)}
                      title="Delete Image"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Camera Info */}
      <div className="camera-info">
        <p>🔒 Your images are stored locally and never uploaded to any server.</p>
        <p>💡 Tip: Allow camera permission for the best experience.</p>
        <p style={{ fontSize: '.75rem' }}>If camera stays black: 1) Click Test Camera 2) Open http://localhost:3000 in an external browser 3) Use the Upload/Mobile Capture fallback.</p>
      </div>

      {/* Fallback uploaded images */}
      {fallbackImages.length > 0 && (
        <div className="gallery-section">
          <div className="gallery-header">
            <h3>🖼️ Fallback Uploads ({fallbackImages.length})</h3>
          </div>
          <div className="gallery-grid">
            {fallbackImages.map(img => (
              <div key={img.id} className="gallery-item">
                <img src={img.dataUrl} alt={img.fileName || 'Uploaded selfie'} className="gallery-image" />
                <div className="gallery-overlay">
                  <div className="gallery-info">
                    <p className="timestamp">{img.timestamp}</p>
                    {img.fileName && <p className="dimensions">{img.fileName}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelfieCamera;
