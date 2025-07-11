import React, { useEffect, useState } from 'react';
import styles from './MevMetrics.module.css';

interface MetricsResponse {
  totalMevRefund: number;
  totalGasRefund: number;
  fetchedAt: string;
  stale: boolean;
}

export default function MevMetrics(): JSX.Element {
  const [data, setData] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('https://refund-metrics-dune-api.vercel.app/api/metrics');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const metrics: MetricsResponse = await response.json();
        setData(metrics);
      } catch (error) {
        console.error('Error fetching MEV metrics:', error);
        // Mock data as fallback
        setData({
          totalMevRefund: 380.29,
          totalGasRefund: 444.24,
          fetchedAt: new Date().toISOString(),
          stale: true
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const formatValue = (value: number): string => {
    return `${value.toFixed(2)} ETH`;
  };

  return (
    <div className={styles.container}>
      <span className={styles.label}>Refund</span>
      <span className={styles.separator}>|</span>
      <div className={styles.metric}>
        <span className={styles.label}>MEV:</span>
        <span className={`${styles.value} ${loading ? styles.loading : ''}`}>
          {loading ? '...' : data && formatValue(data.totalMevRefund)}
        </span>
      </div>
      <span className={styles.separator}>|</span>
      <div className={styles.metric}>
        <span className={styles.label}>Gas:</span>
        <span className={`${styles.value} ${loading ? styles.loading : ''}`}>
          {loading ? '...' : data && formatValue(data.totalGasRefund)}
        </span>
      </div>
    </div>
  );
}