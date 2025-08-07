# Adding MEV Metrics Tickers to Docusaurus Navbar

This guide explains how to add MEV metrics tickers to a Docusaurus website navbar using the ComponentTypes pattern.

## Overview

Add a compact metrics ticker to the navbar displaying: `Refund | MEV: 380.290 ETH | Gas: 444.240 ETH`

## Implementation Steps

### 1. Install Dependencies

```bash
npm install
```

Create `.env` file if needed:
```
BASE_URL=/
TARGET_URL=http://localhost:3000
```

### 2. Create MEV Metrics Component

Create `src/components/MevMetrics.tsx`:

```tsx
import React, { useEffect, useState } from 'react';
import styles from './MevMetrics.module.css';

interface MetricData {
  value: number;
  unit: string;
}

interface MetricsResponse {
  mevRefund: MetricData;
  gasRefund: MetricData;
}

export default function MevMetrics(): JSX.Element {
  const [data, setData] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/mev/metrics');
        const metrics: MetricsResponse = await response.json();
        setData(metrics);
      } catch (error) {
        console.error('Error fetching MEV metrics:', error);
        // Mock data as fallback
        setData({
          mevRefund: { value: 380.29, unit: 'ETH' },
          gasRefund: { value: 444.24, unit: 'ETH' }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const formatValue = (metric: MetricData): string => {
    if (metric.unit === '$') {
      if (metric.value >= 1e9) return `$${(metric.value / 1e9).toFixed(1)}B`;
      if (metric.value >= 1e6) return `$${(metric.value / 1e6).toFixed(1)}M`;
      if (metric.value >= 1e3) return `$${(metric.value / 1e3).toFixed(1)}K`;
      return `$${metric.value.toFixed(2)}`;
    }
    return `${metric.value.toFixed(3)} ${metric.unit}`;
  };

  return (
    <div className={styles.container}>
      <span className={styles.label}>Refund</span>
      <span className={styles.separator}>|</span>
      <div className={styles.metric}>
        <span className={styles.label}>MEV:</span>
        <span className={`${styles.value} ${loading ? styles.loading : ''}`}>
          {loading ? '...' : data && formatValue(data.mevRefund)}
        </span>
      </div>
      <span className={styles.separator}>|</span>
      <div className={styles.metric}>
        <span className={styles.label}>Gas:</span>
        <span className={`${styles.value} ${loading ? styles.loading : ''}`}>
          {loading ? '...' : data && formatValue(data.gasRefund)}
        </span>
      </div>
    </div>
  );
}
```

### 3. Create CSS Module

Create `src/components/MevMetrics.module.css`:

```css
.container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: var(--ifm-navbar-link-color);
  margin-right: 0.75rem;
}

.metric {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.label {
  font-weight: 400;
}

.value {
  font-family: monospace;
  font-weight: 600;
  transition: opacity 0.3s ease;
}

.loading {
  opacity: 0.5;
}

.separator {
  color: var(--ifm-navbar-link-color);
  opacity: 0.3;
}

@media (max-width: 996px) {
  .container {
    display: none !important;
  }
}
```

### 4. Swizzle ComponentTypes

```bash
npm run swizzle @docusaurus/theme-classic NavbarItem/ComponentTypes -- --eject --typescript
```

### 5. Register Component

Update `src/theme/NavbarItem/ComponentTypes.tsx`:

```tsx
// Add import at top
import MevMetrics from '@site/src/components/MevMetrics';

// Add to ComponentTypes object
const ComponentTypes: ComponentTypesObject = {
  // ... existing types
  'custom-mevMetrics': MevMetrics,
};
```

### 6. Configure Navbar

Update `docusaurus.config.js`:

```javascript
navbar: {
  items: [
    { to: '/docs', label: 'Docs', position: 'left' },
    { to: '/blog', label: 'Blog', position: 'left' },
    {
      type: 'custom-mevMetrics',
      position: 'right',
    },
    {
      href: 'https://your-forum-link.com',
      label: 'Forum',
      position: 'right',
    },
  ],
},
```

## API Specification

Endpoint: `/api/mev/metrics`

Expected response:
```json
{
  "mevRefund": {
    "value": 380.29,
    "unit": "ETH"
  },
  "gasRefund": {
    "value": 444.24,
    "unit": "ETH"
  }
}
```

## Features

- **Single API call** for both metrics
- **CSS Modules** for better performance and maintainability
- **Responsive design** - hidden on mobile devices
- **Loading states** with visual feedback
- **Error handling** with mock data fallback
- **Number formatting** for large values (K/M/B)

## Notes

- Mock data is included for development
- Metrics update once on page load (suitable for daily updates)
- Uses Docusaurus theme variables for consistent styling