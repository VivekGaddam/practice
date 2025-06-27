const Organization = require('../models/Organization');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const  generateOrganizationCode  = require('../utils/generateOrganizationCode.js'); // Assuming you have a utility function for generating organization codes


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});



const sendOrganizationApprovedEmail = async (org) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: org.contact?.email,
        subject: 'Your Organization Has Been Approved',
        html: `
            <p>Dear ${org.contact?.person || 'User'},</p>
            <p>Your organization <strong>${org.name}</strong> has been approved by the NGO admin.</p>
            <p>Your unique organization code is: <strong>${org.organizationCode}</strong></p>
            <p>You can now log in and start using the platform: <a href="${process.env.FRONTEND_URL}/login">Login</a></p>
        `,
    };

    await transporter.sendMail(mailOptions);
};


exports.createOrganization = async (req, res) => {
    try {
        const organizationCode = generateOrganizationCode(req.body.name);

        const newOrg = new Organization({
            ...req.body,
            organizationCode,
            status: 'pending'
        });

        const organization = await newOrg.save();
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.contact.email,
            subject: 'Organization Registration Received',
            html: `
                <p>Thank you for registering your organization: <strong>${req.body.name}</strong></p>
                <p>Your unique organization code is: <strong>${organizationCode}</strong></p>
                <p>Share this code with your team so they can join under this organization during registration.</p>
            `
        };

        await transporter.sendMail(mailOptions);

        await sendOrganizationApprovedEmail(organization);

        res.status(201).json({
            message: 'Organization registered. Approval pending.',
            organizationCode
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
exports.getOrganizations = async (req, res) => {
    try {
        const { status } = req.query;
        const filter = status ? { status } : {};
        const organizations = await Organization.find(filter);
        res.json(organizations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// ✅ Get a single organization by ID
exports.getOrganizationById = async (req, res) => {
    try {
        const organization = await Organization.findById(req.params.id);
        if (!organization) {
            return res.status(404).json({ msg: 'Organization not found' });
        }
        res.json(organization);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// ✅ Update organization
exports.updateOrganization = async (req, res) => {
    try {
        let organization = await Organization.findById(req.params.id);
        if (!organization) {
            return res.status(404).json({ msg: 'Organization not found' });
        }

        organization = await Organization.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(organization);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// ✅ Delete organization
exports.deleteOrganization = async (req, res) => {
    try {
        const organization = await Organization.findById(req.params.id);
        if (!organization) {
            return res.status(404).json({ msg: 'Organization not found' });
        }

        await Organization.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Organization removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

