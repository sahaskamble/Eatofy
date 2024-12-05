'use client';

import React from 'react';

function KotPrint({ type, table_name, cart, date }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div style={{ width: '80mm', padding: '10px', fontFamily: 'monospace', fontSize: '12px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <h2 style={{ margin: '0', fontSize: '16px' }}>** KOT **</h2>
        <div>Type: {type || ''}</div>
        <div>Date: {formatDate(date)}</div>
        <div style={{ borderBottom: '1px dashed black', margin: '5px 0' }} />
      </div>

      {/* Table Name */}
      <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
        {table_name || ''}
        <div style={{ borderBottom: '1px dashed black', margin: '5px 0' }} />
      </div>

      {/* Items Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span style={{ fontWeight: 'bold' }}>Item</span>
        <span style={{ fontWeight: 'bold' }}>Qty</span>
      </div>
      <div style={{ borderBottom: '1px dashed black', margin: '5px 0' }} />

      {/* Items */}
      <div>
        {Array.isArray(cart) && cart.map((item, index) => (
          <div key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{item?.DishId?.DishName?.substring(0, 20) || ''}</span>
              <span>{item?.quantity || ''}</span>
            </div>
            {item?.note && (
              <div style={{ fontSize: '10px', fontStyle: 'italic', marginLeft: '10px', color: '#666' }}>
                Note: {item.note}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ borderBottom: '1px dashed black', margin: '10px 0' }} />
    </div>
  );
}

export default KotPrint;
