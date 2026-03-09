import React, { useState, useRef } from 'react';

function Documents() {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Investment Agreement.pdf', status: 'Draft', date: '2026-03-09' },
    { id: 2, name: 'Term Sheet.pdf', status: 'In Review', date: '2026-03-08' },
    { id: 3, name: 'NDA.pdf', status: 'Signed', date: '2026-03-07' }
  ]);
  const [showSignature, setShowSignature] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  let sigCanvas = useRef({});

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newDoc = {
        id: documents.length + 1,
        name: file.name,
        status: 'Draft',
        date: new Date().toISOString().split('T')[0]
      };
      setDocuments([...documents, newDoc]);
      
      // Preview for PDFs
      if (file.type === 'application/pdf') {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  };

  const updateStatus = (id, newStatus) => {
    setDocuments(documents.map(doc => 
      doc.id === id ? {...doc, status: newStatus} : doc
    ));
  };

  const saveSignature = () => {
    if (sigCanvas.current) {
      const dataURL = sigCanvas.current.toDataURL('image/png');
      console.log('Signature saved for document:', selectedDoc?.name);
      setShowSignature(false);
      setSelectedDoc(null);
      alert('Signature added successfully!');
      
      // Update document status to Signed
      if (selectedDoc) {
        updateStatus(selectedDoc.id, 'Signed');
      }
    }
  };

  const openSignaturePad = (doc) => {
    setSelectedDoc(doc);
    setShowSignature(true);
  };

  const previewDocument = (doc) => {
    alert(`Previewing: ${doc.name}\nThis would open the PDF viewer.`);
  };

  const clearSignature = () => {
    if (sigCanvas.current) {
      const ctx = sigCanvas.current.getContext('2d');
      ctx.clearRect(0, 0, sigCanvas.current.width, sigCanvas.current.height);
    }
  };

  return (
    <div className="document-chamber">
      <h2 className="section-title">Document Chamber</h2>

      <div className="upload-section">
        <input 
          type="file" 
          onChange={handleUpload} 
          accept=".pdf,.doc,.docx" 
          id="file-upload"
          className="file-input"
        />
        <label htmlFor="file-upload" className="btn btn-primary upload-label">
          <span className="btn-icon">📤</span> Upload Document
        </label>
        <p className="upload-hint">Supported: PDF, DOC, DOCX</p>
      </div>

      <div className="documents-list">
        <h3>All Documents <span className="doc-count">({documents.length})</span></h3>
        
        {documents.length === 0 ? (
          <p className="no-docs">No documents yet. Upload your first document!</p>
        ) : (
          documents.map(doc => (
            <div key={doc.id} className="document-card">
              <div className="doc-icon">📄</div>
              <div className="doc-info">
                <span className="doc-name">{doc.name}</span>
                <span className="doc-date">Added: {doc.date}</span>
                <select 
                  value={doc.status}
                  onChange={(e) => updateStatus(doc.id, e.target.value)}
                  className={`status-dropdown status-${doc.status.toLowerCase().replace(' ', '-')}`}
                >
                  <option value="Draft">Draft</option>
                  <option value="In Review">In Review</option>
                  <option value="Signed">Signed</option>
                </select>
              </div>
              <div className="doc-actions">
                <button 
                  className="btn btn-icon-only" 
                  onClick={() => previewDocument(doc)}
                  title="Preview"
                >
                  👁️
                </button>
                <button 
                  className="btn btn-icon-only" 
                  onClick={() => openSignaturePad(doc)}
                  title="Sign"
                  disabled={doc.status === 'Signed'}
                >
                  ✍️
                </button>
                <button 
                  className="btn btn-icon-only" 
                  title="Download"
                >
                  ⬇️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showSignature && (
        <div className="signature-modal">
          <div className="signature-header">
            <h3>Sign Document: {selectedDoc?.name}</h3>
            <button className="close-btn" onClick={() => setShowSignature(false)}>✕</button>
          </div>
          
          <div className="signature-instructions">
            <p>Draw your signature in the box below:</p>
          </div>

          <canvas
            ref={sigCanvas}
            width={500}
            height={200}
            className="signature-canvas"
            onMouseDown={(e) => {
              const canvas = e.target;
              const ctx = canvas.getContext('2d');
              ctx.beginPath();
              ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            }}
            onMouseMove={(e) => {
              if (e.buttons !== 1) return;
              const canvas = e.target;
              const ctx = canvas.getContext('2d');
              ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
              ctx.stroke();
              ctx.strokeStyle = '#000';
              ctx.lineWidth = 2;
            }}
          />
          
          <div className="signature-actions">
            <button onClick={clearSignature} className="btn btn-secondary">
              Clear
            </button>
            <button onClick={saveSignature} className="btn btn-primary">
              Save Signature
            </button>
          </div>
        </div>
      )}

      <div className="signature-info">
        <p>✍️ Click the signature icon on any document to add your e-signature</p>
      </div>
    </div>
  );
}

export default Documents;