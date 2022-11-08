import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import image from '../images/logo.png'

// Create styles
const styles = StyleSheet.create({
  page: {
    // flexDirection: 'row',
    backgroundColor: 'white',
    border: '3px solid black',
    // margin: '10px',
    // width: '100px'
  },
  section: {
    margin: '10px',
    fontSize: '13px'

  }
});

// Create Document Component
const IssueCertificate = (props) => (
  <Document>

    <Page size="A4" style={styles.page}>

      <View style={{fontSize:'20px',margin: '10px', padding: '5px', textAlign:'center'}}>
        <Text>Certificate issued by Grama Niladhari</Text>
      </View>

      <View style={styles.section}>
        <Text>NIC : {props.details.nic}</Text>
      </View>

      <View style={styles.section}>
        <Text>Name : {props.details.name}</Text>
      </View>

      <View style={styles.section}>
        <Text>Address : {props.details.address}</Text>
      </View>

      <View style={styles.section}>
        <Text>Police report status : Has not involved in any criminal activities, 
              nor has he/she come to the adverse notice of the police during the 
              period of residence in my area.</Text>
      </View>

    {/* keep a space between  */}
      <View>
        <Text> </Text>
      </View>

      <View style={styles.section}>
        <Text>It is hereby certified that above particulars are correct to the best of my knowledge, he/she is a 
          citizen of Sri Lanka by descent/registration, that it has been issued by, 
        </Text>
        <Text> </Text>
        <Text>Grama Niladhari</Text>
        <Text>{props.details.address} Division</Text>
        <Text></Text>
      </View>

    </Page>
  </Document>
);

export default IssueCertificate;