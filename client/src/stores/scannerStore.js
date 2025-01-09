import { create } from 'zustand'

const useScannerStore = create((set) => ({
  scannerInfo: null,
  setScannerInfo: (info) => set({ scannerInfo: info }),
  clearScannerInfo: () => set({ scannerInfo: null }),
}))

export default useScannerStore
