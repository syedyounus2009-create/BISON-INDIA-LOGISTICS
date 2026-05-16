from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from datetime import datetime
import os

class InvoiceService:
    def generate_invoice(self, trip_id, load_data, user_data):
        """Generate GST-compliant invoice PDF"""
        
        filename = f"invoice_trip_{trip_id}_{datetime.now().strftime('%Y%m%d')}.pdf"
        filepath = os.path.join('invoices', filename)
        
        os.makedirs('invoices', exist_ok=True)
        
        doc = SimpleDocTemplate(filepath, pagesize=A4)
        styles = getSampleStyleSheet()
        elements = []
        
        # Header
        header_style = ParagraphStyle('CustomHeader', parent=styles['Heading1'], fontSize=24, textColor=colors.orange)
        elements.append(Paragraph("BISON INDIA LOGISTICS", header_style))
        elements.append(Paragraph("Smart Logistics. Powerful Movement.", styles['Normal']))
        elements.append(Spacer(1, 0.2 * inch))
        
        # Invoice Title
        elements.append(Paragraph(f"TAX INVOICE", styles['Heading2']))
        elements.append(Spacer(1, 0.2 * inch))
        
        # Invoice Details Table
        invoice_data = [
            ['Invoice No:', f'INV-{trip_id}-{datetime.now().strftime("%m%Y")}', 'Date:', datetime.now().strftime('%d/%m/%Y')],
            ['Trip ID:', trip_id, 'GSTIN:', '27AABCU1234H1Z'],
            ['Place of Supply:', load_data.get('pickup_location', ''), 'State:', 'Telangana'],
        ]
        
        invoice_table = Table(invoice_data, colWidths=[1.5 * inch, 2 * inch, 1.5 * inch, 2 * inch])
        invoice_table.setStyle(TableStyle([
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ]))
        elements.append(invoice_table)
        elements.append(Spacer(1, 0.3 * inch))
        
        # Party Details
        party_data = [
            ['Billing Party:', user_data.get('name', 'Customer'), 'Shipping Party:', user_data.get('name', 'Customer')],
            ['GSTIN:', user_data.get('gst', ''), 'GSTIN:', user_data.get('gst', '')],
            ['Address:', user_data.get('address', ''), 'Address:', load_data.get('drop_location', '')],
        ]
        
        party_table = Table(party_data, colWidths=[1.5 * inch, 2 * inch, 1.5 * inch, 2 * inch])
        party_table.setStyle(TableStyle([
            ('FONTSIZE', (0, 0), (-1, -1), 9),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))
        elements.append(party_table)
        elements.append(Spacer(1, 0.3 * inch))
        
        # Items Table
        items_data = [
            ['Sl No.', 'Description', 'HSN/SAC', 'Quantity', 'Rate', 'GST%', 'Amount']
        ]
        
        items_data.append([
            '1',
            f"Transportation of {load_data.get('material_type', 'Goods')}",
            '9965',
            f"{load_data.get('weight_tons', 0)} Tons",
            f"₹{load_data.get('rate', 0)}/Ton",
            '5%',
            f"₹{load_data.get('amount', 0)}"
        ])
        
        items_table = Table(items_data, colWidths=[0.5 * inch, 2.5 * inch, 1 * inch, 1 * inch, 1 * inch, 0.8 * inch, 1.2 * inch])
        items_table.setStyle(TableStyle([
            ('FONTSIZE', (0, 0), (-1, -1), 9),
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ]))
        elements.append(items_table)
        elements.append(Spacer(1, 0.2 * inch))
        
        # Tax Summary
        subtotal = load_data.get('amount', 0)
        cgst = subtotal * 0.025
        sgst = subtotal * 0.025
        total = subtotal + cgst + sgst
        
        tax_data = [
            ['Subtotal', f"₹{subtotal}"],
            ['CGST (2.5%)', f"₹{cgst}"],
            ['SGST (2.5%)', f"₹{sgst}"],
            ['Total', f"₹{total}"],
        ]
        
        tax_table = Table(tax_data, colWidths=[3 * inch, 2 * inch])
        tax_table.setStyle(TableStyle([
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
            ('BACKGROUND', (0, -1), (-1, -1), colors.lightgrey),
        ]))
        elements.append(tax_table)
        elements.append(Spacer(1, 0.3 * inch))
        
        # Footer
        elements.append(Paragraph("Amount in words: " + self.number_to_words(total), styles['Normal']))
        elements.append(Spacer(1, 0.2 * inch))
        elements.append(Paragraph("This is a computer generated invoice and does not require signature.", styles['Normal']))
        
        doc.build(elements)
        
        return filepath
    
    def number_to_words(self, num):
        """Convert number to words (simplified)"""
        return f"Rupees {int(num)} only"

invoice_service = InvoiceService()
