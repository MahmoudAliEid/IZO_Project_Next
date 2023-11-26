import React from 'react'
import Button from '@mui/material/Button'

class PrintButton extends React.Component {
  handlePrint = () => {
    // Get the specific area you want to print
    const printableArea = document.getElementById('yourPrintableAreaId')

    // Check if the area exists
    if (printableArea) {
      // Open a new window and write the printable area content
      const printWindow = window.open('', '_blank')
      printWindow.document.write('<html><head><title>Print</title></head><body>')
      printWindow.document.write(printableArea.innerHTML)
      printWindow.document.write('</body></html>')

      // Close the document after writing content
      printWindow.document.close()

      // Print the window
      printWindow.print()
    } else {
      console.error('Printable area not found')
    }
  }

  render() {
    return (
      <Button variant='contained' color='primary' onClick={this.handlePrint}>
        Print
      </Button>
    )
  }
}

export default PrintButton
