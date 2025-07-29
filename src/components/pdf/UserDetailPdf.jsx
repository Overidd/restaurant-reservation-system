import { DateParser } from '@/ultils';
import {
   Document,
   Page,
   pdf,
   StyleSheet,
   Text,
   View,
} from '@react-pdf/renderer';
import { PdfHeader } from '.';

const styles = StyleSheet.create({
   page: {
      padding: 30,
      fontSize: 10,
      fontFamily: 'Helvetica',
   },
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottom: '1 solid #ccc',
      marginBottom: 20,
      paddingBottom: 10,
   },
   logo: {
      width: 100,
      height: 40,
   },
   date: {
      fontSize: 10,
      color: '#555',
   },
   card: {
      border: '1 solid #ccc',
      borderRadius: 4,
      padding: 10,
      marginBottom: 15,
   },
   sectionTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      marginBottom: 4,
      marginTop: 6,
   },
   textLine: {
      marginBottom: 2,
   },
   tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#eee',
      borderBottom: '1 solid #aaa',
      padding: 4,
      marginTop: 6,
   },
   tableRow: {
      flexDirection: 'row',
      borderBottom: '1 solid #ccc',
      padding: 4,
   },
   cell: {
      flex: 1,
      paddingHorizontal: 2,
   },
   smallText: {
      fontSize: 9,
      marginBottom: 2,
   }
});

export const ClientReport = ({ users = [] }) => (
   <Document>
      <Page size="A4" style={styles.page}>
         <PdfHeader logoUrl='/logo-black.png' />

         {users.map((client, i) => (
            <View key={i} style={styles.card} wrap={false}>
               {/* Datos básicos */}
               <Text style={styles.sectionTitle}>
                  Cliente: {client.name}
               </Text>
               <Text style={styles.textLine}>
                  Correo: {client.email}
               </Text>
               <Text style={styles.textLine}>
                  Teléfono: {client.phone || 'N/A'}
               </Text>
               <Text style={styles.textLine}>
                  Dirección: {client.address || 'N/A'}
               </Text>
               <Text style={styles.textLine}>
                  Rol: {client.role}
               </Text>

               {/* Métricas */}
               <Text style={styles.sectionTitle}>
                  Métricas de reservas
               </Text>
               <Text style={styles.textLine}>
                  - Total: {client.metrics.total}
               </Text>
               <Text style={styles.textLine}>
                  - Confirmadas: {client.metrics.confirmed}
               </Text>
               <Text style={styles.textLine}>
                  - Pendientes: {client.metrics.pending}
               </Text>
               <Text style={styles.textLine}>
                  - Canceladas: {client.metrics.canceled}
               </Text>
               <Text style={styles.textLine}>
                  - Liberadas: {client.metrics.released}
               </Text>

               {/* Tabla de reservas */}
               {client.reservations.length > 0 && (
                  <>
                     <Text style={styles.sectionTitle}>
                        Reservas
                     </Text>
                     <View style={styles.tableHeader}>
                        <Text style={styles.cell}>
                           Código
                        </Text>
                        <Text style={styles.cell}>
                           Fecha
                        </Text>
                        <Text style={styles.cell}>
                           Hora
                        </Text>
                        <Text style={styles.cell}>
                           Estado
                        </Text>
                     </View>

                     {client.reservations.map((res, j) => (
                        <View key={j} wrap={false}>
                           <View style={styles.tableRow}>
                              <Text style={styles.cell}>
                                 {res.code}
                              </Text>
                              <Text style={styles.cell}>
                                 {res.dateStr}
                              </Text>
                              <Text style={styles.cell}>
                                 {res.hour}
                              </Text>
                              <Text style={styles.cell}>
                                 {res.status}
                              </Text>
                           </View>
                           <Text style={styles.smallText}>
                              Motivo: {res.reason || 'N/A'}
                           </Text>
                           <Text style={styles.smallText}>
                              Comensales: {res.diners}
                           </Text>
                           <Text style={styles.smallText}>
                              Mesas: {res.tables.map((t) => t.name).join(', ')}
                           </Text>
                        </View>
                     ))}
                  </>
               )}
            </View>
         ))}
      </Page>
   </Document>
);

export const userDetailPdf = async ({ ...data }) => {
   const blob = await pdf(<ClientReport {...data} />).toBlob();
   const url = URL.createObjectURL(blob);
   const a = document.createElement('a');
   const dateStr = DateParser.toString(new Date());
   a.href = url;
   a.download = `reporte-usuarios-${dateStr}.pdf`;
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
};