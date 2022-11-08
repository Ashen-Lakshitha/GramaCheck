import DownloadIcon from '@mui/icons-material/Download';
import ReactPDF from '@react-pdf/renderer';
import IssueCertificate from './IssueCertificate';
import { PDFDownloadLink } from '@react-pdf/renderer'


const Certificate = () => {

  // map the details coming from db here
  const person = {
    "name" : "Default",
    "address" : "Kalutara",
    "nic" : "998756734V"
  }

  return ( 
    <div>
      <h4>Your certificate is ready</h4>

        <button type="submit" className="downloadbtn" >
          
          <PDFDownloadLink document={<IssueCertificate  details={person}/>} fileName="grama certificate.pdf" >
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <DownloadIcon fontSize='medium'/>)}
          </PDFDownloadLink>
          
        </button>
      
    </div>
   );
}
 
export default Certificate;