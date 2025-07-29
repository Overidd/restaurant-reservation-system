import { dashboardPdf, userDetailPdf } from '@/components/pdf';
import { useState } from 'react';

export const useDownloadPdf = () => {
   const [loading, setLoading] = useState({
      downloadDashboard: false,
      downloadUserDetails: false
   })

   const downloadDashboardPdf = async ({ ...data }) => {
      setLoading(prev => ({ ...prev, downloadDashboard: true }));
      await dashboardPdf({ ...data })
      setLoading(prev => ({ ...prev, downloadDashboard: false }));
   };

   const downloadUserDetailPdf = async ({ ...data }) => {
      setLoading(prev => ({ ...prev, downloadUserDetails: true }));
      await userDetailPdf({ ...data })
      setLoading(prev => ({ ...prev, downloadUserDetails: false }));
   };

   return {
      loading: {
         downloadDashboard: loading.downloadDashboard,
         downloadUserDetails: loading.downloadUserDetails
      },
      downloadDashboardPdf,
      downloadUserDetailPdf
   }
}