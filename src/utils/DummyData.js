const profile = {
  name: 'Vinnie Felim',
  position: 'Operasional',
  email: 'vinnie@gmail.com',
  location: 'Medan',
  image: 'https://source.unsplash.com/200x200/?woman',
};

const shipmentData = {
  bookNumber: '202401270001',
  shipper: 'PUTRA SEJATI',
  bookedBy: 'Billy Chayadi',
  stuffingDate: '01-02-2024',
  unitNumber: 'GESU9282682',
  pol: 'SUB',
  pod: 'MKS',
  etd: '04/02/2024',
  remark: 'Container Sudah Naik Kapal',
};

const shipmentTotal = {
  Medan: 500,
  Makassar: 350,
  Jakarta: 200,
  Surabaya: 300,
};

const containerStatus = {
  Ready: 200,
  InUse: 150,
  Repair: 50,
};

export { profile, shipmentData, shipmentTotal, containerStatus };
