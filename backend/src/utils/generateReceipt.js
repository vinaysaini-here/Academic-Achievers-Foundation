// import PDFDocument from "pdfkit";
// import numWords from "num-words"; // npm install num-words

// export const generateReceipt = (donation, donor, res = null) => {
//   const doc = new PDFDocument({ margin: 50 });

//   if (res) {
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=receipt_${donation._id}.pdf`
//     );
//     doc.pipe(res);
//   }

//   // Header
//   doc.fontSize(16).text("BHARAT CHARITY TRUST", { align: "center" });
//   doc.fontSize(10).text("JAN KALYAN BHAWAN, LOK SEWA MARG, NEW DELHI", {
//     align: "center",
//   });
//   doc.text("Email: donate@bharatcharity.in | www.bharatcharity.in", {
//     align: "center",
//   });

//   doc.moveDown();
//   doc.fontSize(14).text("DONATION RECEIPT", { align: "center", underline: true });
//   doc.moveDown();

//   // Receipt info
//   doc.fontSize(12)
//     .text(`Receipt No: ${donation._id}`)
//     .text(`Date: ${new Date(donation.createdAt).toLocaleDateString()}`)
//     .moveDown();

//   // Donor info
//   doc.text(`Received with thanks from: ${donor.name}`)
//     .text(`Address: ${donor.address || "N/A"}`)
//     .text(`PAN: ${donor.pan || "N/A"}`)
//     .moveDown();

//   // Payment info
//   doc.text(`The sum of ₹${donation.amount}`)
//     .text(`In words: (INR ${numWords(donation.amount).toUpperCase()} Only)`)
//     .text(`Towards: ${donation.purpose || "General Donation"}`)
//     .text(`By mode of: ${donation.paymentMethod}`)
//     .text(`Transaction ID: ${donation.transactionId}`)
//     .moveDown();

//   // Tax info
//   doc.fontSize(10)
//     .text("Eligible under Section 80G of the Income Tax Act, 1961.")
//     .text("Unique Reg. No: ABDCE1234A01012021 | Date: 01-Jan-21")
//     .moveDown();

//   // Terms
//   doc.fontSize(9)
//     .text("Terms & Conditions:", { underline: true })
//     .text("1. Cheque / DD is subject to realisation.")
//     .text("2. Registration Number: DELHI/2021/10")
//     .moveDown(2);

//   doc.text("For BHARAT CHARITY TRUST", { align: "right" });
//   doc.moveDown().text("Authorised Signatory", { align: "right" });

//   doc.end();

//   return doc;
// };


// export default generateReceipt;



import PDFDocument from "pdfkit";
import numWords from "num-words"; // npm install num-words

export const generateReceipt = (donation, donor, res = null) => {
  const doc = new PDFDocument({ margin: 50 });

  if (res) {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=receipt_${donation._id}.pdf`
    );
    doc.pipe(res);
  }

  // ========== HEADER ==========
  doc.fontSize(18).text("AAEAR Foundation", { align: "center", bold: true });
  doc.fontSize(10).text(
    "(Academics Achievers Education and Research Foundation)",
    { align: "center" }
  );

  doc.moveDown(1);

  doc.fontSize(14).text("DONATION RECEIPT", { align: "center", underline: true });
  doc.moveDown();

  // ========== RECEIPT INFO ==========
  doc.fontSize(12)
    .text(`Receipt No: ${donation._id}`)
    .text(`Date: ${new Date(donation.createdAt).toLocaleDateString()}`, {
      align: "left",
    });

  doc.text(`Donor Name: ${donor.name || "N/A"}`, { align: "right" });
  doc.text(`Donor Email: ${donor.email || "N/A"}`, { align: "right" });
  doc.moveDown();

  // ========== MESSAGE ==========
  doc.text(
    "We extend our sincerest gratitude for your generous contribution.",
    { align: "left" }
  );
  doc.moveDown();

  // ========== DONATION DETAILS ==========
  doc.fontSize(12).text("Description", 70).text("Amount (INR)", 400);
  doc.moveTo(50, doc.y + 2).lineTo(550, doc.y + 2).stroke();

  doc.moveDown(0.5);
  doc.text(donation.purpose || "General Education Fund Donation", 70);
  doc.text(`${donation.amount.toFixed(2)}`, 400);
  doc.moveDown(1.5);

  // ========== TAX INFO ==========
  doc.fontSize(10).text(
    "This donation is eligible for tax exemption under section 80G of the Income Tax Act, 1961."
  );
  doc.text(
    "Our registration number is [217776]."
  );
  doc.moveDown();

  // ========== TOTAL ==========
  doc.fontSize(12).text(
    `Total Donated: INR ${donation.amount.toFixed(2)}`,
    { bold: true }
  );
  doc.text(
    `In words: (INR ${numWords(donation.amount).toUpperCase()} Only)`
  );
  doc.moveDown();

  // ========== FOOTER ==========
  doc.fontSize(10).text(
    "Thank you for empowering education and research.",
    { align: "left" }
  );
  doc.moveDown(2);

  doc.text("For AAEAR Foundation", { align: "right" });
  doc.moveDown().text("Authorised Signatory", { align: "right" });

  doc.moveDown(2);
  doc.fontSize(9).text(
    "AAEAR Foundation | Umrapur, Ibrahimpur, Raebareli 229212, Uttar Pradesh, India"
  );
  doc.text("Contact: academicsachieversfoundation@gmail.com | +91 90264 70888");
  // doc.text("www.thorised.org");

  doc.end();
  return doc;
};

export default generateReceipt;
