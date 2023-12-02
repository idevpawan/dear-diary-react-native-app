export function formatEpochTime(epochTime: number) {
    const date = new Date(epochTime); // Convert seconds to milliseconds
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }