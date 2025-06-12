import React from "react";
import logo from "../assets/logo.png";

const numberToWords = (num) => {
  // Simple sample. For real app, use npm "number-to-words" or similar.
  if (num === 0) return "Zero Naira Only";
  if (num === 100000) return "One Hundred Thousand Naira Only";
  return `${num} Naira Only`;
};

const InvoiceTemplate = ({ invoiceData }) => (
  <div className="invoice-container">
    <div className="invoice-header">
      <img src={logo} alt="Foley's Place Logo" className="invoice-logo" />
      <div className="invoice-title">SALES INVOICE</div>
      <div className="business-name"><b>Foley's Place</b></div>
      <div className="business-contact">
        Tel.: 08189430651, 08034726654<br />
        Email: foley'splace@yahoo.com<br />
        8, EMMANUEL KOLAWOLE STREET OFF BAJULAIYE ROAD SHOMOLU
      </div>
    </div>
    <table className="invoice-table">
      <thead>
        <tr>
          <th>S/N</th><th>Description of Goods</th><th>Qty.</th>
          <th>Unit</th><th>Price</th><th>Amount (NGN)</th>
        </tr>
      </thead>
      <tbody>
        {invoiceData.items.map((item, idx) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>{item.description}</td>
            <td>{item.qty}</td>
            <td>{item.unit}</td>
            <td>{item.price.toLocaleString()}</td>
            <td>{item.amount.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="invoice-total">
      <strong>Grand Total: NGN {invoiceData.total.toLocaleString()}</strong>
      <div>Amount in Words: {numberToWords(invoiceData.total)}</div>
    </div>
    <div className="invoice-footer">
      <div className="terms">
        <strong>Terms & Conditions:</strong>
        <div>{invoiceData.terms}</div>
      </div>
      <div className="signatures">
        <div>Receiver’s Signature: ____________________</div>
        <div>Authorized Signature: ____________________</div>
      </div>
    </div>
  </div>
);

export default InvoiceTemplate;
