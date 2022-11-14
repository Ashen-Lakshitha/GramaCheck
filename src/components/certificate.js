import DownloadIcon from '@mui/icons-material/Download';
import IssueCertificate from './issueCertificate';
import { PDFDownloadLink } from '@react-pdf/renderer'


function Certificate ({person, response}) {
  const person1 = {
    "name" : "Default",
    "address" : "Kalutara",
    "nic" : "998756734V"
  }

  return ( 
    <div>
      <h4>Your certificate is ready</h4>
        <button type="submit" className="downloadbtn" >
          
          <PDFDownloadLink document={<IssueCertificate  details={person1}/>} fileName="grama certificate.pdf" >
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <DownloadIcon fontSize='medium'/>)}
          </PDFDownloadLink>
          
        </button>
      
    </div>
   );
}
 
export default Certificate;