module.exports = function generateOrganizationCode(name) {
    const base = name.toLowerCase().replace(/\s+/g, '').slice(0, 5);
    const random = Math.floor(1000 + Math.random() * 9000); // 4-digit
    return `${base}${random}`;
};
