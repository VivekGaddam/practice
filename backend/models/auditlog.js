const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true }, // e.g., 'CREATE', 'UPDATE', 'DELETE', 'AMEND_DISTRIBUTION_LOG'
    collectionName: { type: String, required: true }, // e.g., 'DistributionLog', 'Organization'
    documentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    oldValue: { type: mongoose.Schema.Types.Mixed }, // Store previous state of the field(s) changed
    newValue: { type: mongoose.Schema.Types.Mixed }, 
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', auditLogSchema);



