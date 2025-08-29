import React, { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './MevMetrics.module.css';

interface MetricsResponse {
  totalMevRefund: number;
  totalGasRefund: number;
  fetchedAt: string;
  stale: boolean;
  showWidget?: boolean;
}

export default function MevMetrics(): JSX.Element | null {
  const { siteConfig } = useDocusaurusContext();
  const [data, setData] = useState<MetricsResponse | null>(null);
  const [showWidget, setShowWidget] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const apiUrl = siteConfig.customFields?.refundMetricsApiUrl as string;
        const response = await fetch(`${apiUrl}/api/metrics`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const metrics: MetricsResponse = await response.json();
        
        // Check feature flag
        if (metrics.showWidget === false) {
          setShowWidget(false);
          setLoading(false);
          return;
        }
        
        setData(metrics);
      } catch (error) {
        console.error('Error fetching MEV metrics:', error);
        // Don't show widget on error
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const formatValue = (value: number): string => {
    return `${value.toFixed(2)} ETH`;
  };

  const handleClick = () => {
    const redirectUrl = siteConfig.customFields?.refundMetricsRedirectUrl as string;
    window.open(redirectUrl, '_blank', 'noopener,noreferrer');
  };

  // Hide widget if flag says so or if no data
  if (!showWidget || (!loading && !data)) {
    return null;
  }

  return (
    <div 
      className={`navbar__item ${styles.container} ${styles.clickable}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}
      >
      <span className={styles.label}>Refund</span>
      <span className={styles.separator}>|</span>
      <div className={styles.metric}>
        <span className={styles.label}>MEV</span>
        <span className={`${styles.value} ${loading ? styles.loading : ''}`}>
          {loading ? '...' : data && formatValue(data.totalMevRefund)}
        </span>
      </div>
      <span className={styles.separator}>|</span>
      <div className={styles.metric}>
        <span className={styles.label}>Gas</span>
        <span className={`${styles.value} ${loading ? styles.loading : ''}`}>
          {loading ? '...' : data && formatValue(data.totalGasRefund)}
        </span>
      </div>
    </div>
  );
}