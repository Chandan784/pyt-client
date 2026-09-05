import jsPDF from "jspdf";

export const downloadPaymentReceipt = (payment) => {
  const doc = new jsPDF();

  const amount = Number(payment.amount || 0).toLocaleString("en-IN");

  const paymentDate = payment.payment_date
    ? new Date(payment.payment_date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  // =========================
  // HEADER
  // =========================

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("PAYMENT RECEIPT", 105, 25, {
    align: "center",
  });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Travel Agency", 105, 33, {
    align: "center",
  });

  doc.line(20, 42, 190, 42);

  // =========================
  // PAYMENT DETAILS
  // =========================

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");

  doc.text("Payment ID", 20, 58);
  doc.text("Booking ID", 20, 70);
  doc.text("Customer", 20, 82);
  doc.text("Payment Method", 20, 94);
  doc.text("Transaction ID", 20, 106);
  doc.text("Payment Date", 20, 118);
  doc.text("Status", 20, 130);

  doc.setFont("helvetica", "normal");

  doc.text(payment.payment_id || `#${payment.id}`, 75, 58);

  doc.text(
    payment.booking_id
      ? `#${payment.booking_id}`
      : "—",
    75,
    70
  );

  doc.text(
    payment.customer_name || "Unknown Customer",
    75,
    82
  );

  doc.text(
    payment.payment_method || "—",
    75,
    94
  );

  doc.text(
    payment.transaction_id || "—",
    75,
    106
  );

  doc.text(paymentDate, 75, 118);

  doc.text(payment.status || "—", 75, 130);

  // =========================
  // AMOUNT
  // =========================

  doc.line(20, 142, 190, 142);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);

  doc.text("Amount Paid", 20, 157);

  doc.setFontSize(16);

  doc.text(`INR ${amount}`, 190, 157, {
    align: "right",
  });

  doc.line(20, 170, 190, 170);

  // =========================
  // FOOTER
  // =========================

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  doc.text(
    "Thank you for your payment.",
    105,
    185,
    {
      align: "center",
    }
  );

  doc.text(
    "This is a computer-generated payment receipt.",
    105,
    193,
    {
      align: "center",
    }
  );

  // =========================
  // DOWNLOAD
  // =========================

  const fileName = `${
    payment.payment_id || `PAY-${payment.id}`
  }.pdf`;

  doc.save(fileName);
};