import { DateParser } from '@/ultils';
import {
   Document,
   Page,
   StyleSheet,
   Text,
   View,
   pdf,
} from '@react-pdf/renderer';
import { PdfHeader } from '.';

const styles = StyleSheet.create({
   page: {
      padding: 30,
      backgroundColor: '#f8f8f8',
      fontSize: 10,
      fontFamily: 'Helvetica',
   },
   section: {
      marginBottom: 20,
   },
   title: {
      fontSize: 14,
      marginBottom: 10,
      fontWeight: 'bold',
   },
   table: {
      display: 'table',
      width: '100%',
   },
   tableRow: {
      flexDirection: 'row',
   },
   tableCell: {
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 4,
      flex: 1,
      textAlign: 'center',
   },
   headerCell: {
      backgroundColor: '#eee',
      fontWeight: 'bold',
   },
   red: { color: 'red' },

   row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
   },
   card: {
      backgroundColor: '#ffffff',
      padding: 10,
      borderRadius: 6,
      width: '48%',
      borderWidth: 1,
      borderColor: '#ccc',
   },
   description: {
      fontSize: 10,
      marginBottom: 4,
   },
   rate: {
      fontSize: 9,
      color: '#666',
      fontStyle: 'italic',
   },
});

const groupMetricsInPairs = (data) => {
   const maxItems = 6;
   const limited = data.slice(0, maxItems);
   const pairs = [];
   for (let i = 0; i < limited.length; i += 2) {
      pairs.push(limited.slice(i, i + 2));
   }
   return pairs;
};

export const FullPDF = ({
   metrics = [],
   topClients = [],
   problematicClients = [],
   topClientAnalysis = [],
}) => (
   <Document>
      <Page size='A4' style={styles.page}>
         <PdfHeader logoUrl='/logo-black.png' />

         <View style={styles.section}>
            <Text style={styles.title}>Reporte de Métricas</Text>
            {groupMetricsInPairs(metrics).map((pair, rowIdx) => (
               <View style={styles.row} key={rowIdx}>
                  {pair.map((m, idx) => (
                     <View key={idx} style={styles.card}>
                        <Text style={styles.title}>{m.title}</Text>
                        <Text style={styles.description}>
                           {m.description}:{' '}
                           <Text style={{ fontWeight: 'bold' }}>{m.count}</Text>
                        </Text>
                        <Text style={styles.rate}>Tasa de crecimiento: {m.rate} %</Text>
                     </View>
                  ))}
               </View>
            ))}
         </View>

         <View style={styles.section}>
            <Text style={styles.title}>
               Clientes más frecuentes del restaurante
            </Text>
            <View style={styles.table}>
               <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                     #
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                     Cliente
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                     Teléfono
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                     Reservas
                  </Text>
               </View>
               {topClients.map((client, i) => (
                  <View style={styles.tableRow} key={i}>
                     <Text style={styles.tableCell}>
                        {`#${i + 1}`}
                     </Text>
                     <Text style={styles.tableCell}>
                        {client.name}
                     </Text>
                     <Text style={styles.tableCell}>
                        {client.phone || '-'}
                     </Text>
                     <Text style={styles.tableCell}>
                        {client.total}
                     </Text>
                  </View>
               ))}
            </View>
         </View>

         <View style={styles.section}>
            <Text style={styles.title}>
               Clientes que no se presentaron a sus reservas
            </Text>
            <View style={styles.table}>
               <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                     Cliente
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                     No presentados
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                     Última Fecha
                  </Text>
               </View>
               {problematicClients.map((client, i) => (
                  <View style={styles.tableRow} key={i}>
                     <Text style={styles.tableCell}>
                        {client.name}
                     </Text>
                     <Text style={styles.tableCell}>
                        {client.noShow}
                     </Text>
                     <Text style={styles.tableCell}>
                        {client.dataStr || '-'}
                     </Text>
                  </View>
               ))}
            </View>
         </View>

         <View style={styles.section}>
            <Text style={styles.title}>
               Análisis de Reservas por Cliente
            </Text>
            <View style={styles.table}>
               <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                     Cliente
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                     Canceladas
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                     Confirmadas
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                     No presentado
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                     Completadas
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                     Total
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                     Tasa Éxito
                  </Text>
               </View>
               {topClientAnalysis.map((client, i) => (
                  <View style={styles.tableRow} key={i}>
                     <Text style={styles.tableCell}>
                        {client.name}
                     </Text>
                     <Text style={styles.tableCell}>
                        {client.canceled}
                     </Text>
                     <Text style={styles.tableCell}>
                        {client.confirmed}
                     </Text>
                     <Text style={styles.tableCell}>
                        {client.noShow}
                     </Text>
                     <Text style={styles.tableCell}>
                        {client.released}
                     </Text>
                     <Text style={styles.tableCell}>
                        {client.total}
                     </Text>
                     <Text style={[styles.tableCell, client.released === 0 ? styles.red : null]}>
                        {client.rate} %
                     </Text>
                  </View>
               ))}
            </View>
         </View>
      </Page>
   </Document>
);

export const dashboardPdf = async ({ ...data }) => {
   const blob = await pdf(<FullPDF {...data} />).toBlob();
   const url = URL.createObjectURL(blob);
   const a = document.createElement('a');
   const dateStr = DateParser.toString(new Date());
   a.href = url;
   a.download = `reporte-dashboard-${dateStr}.pdf`;
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
};