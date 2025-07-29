import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';

const stylesHeader = StyleSheet.create({
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1 solid #ccc',
      paddingBottom: 10,
      marginBottom: 20,
      paddingHorizontal: 20,
   },
   logo: {
      width: 90,
      height: 90,
   },
   date: {
      fontSize: 10,
      color: '#555',
   },
});

export const PdfHeader = ({ logoUrl }) => {
   const today = new Date().toLocaleDateString();

   return (
      <View style={stylesHeader.header}>
         <Image
            style={stylesHeader.logo}
            src={logoUrl}
         />
         <Text style={stylesHeader.date}>
            Fecha de generación: {today}
         </Text>
      </View>
   );
};