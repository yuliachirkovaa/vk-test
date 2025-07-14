const months = [

  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",

]

const formatDate = (dateString: string) => {

  const d = new Date( dateString );
  if ( !d?.getDate() ) { return 'Некорректная дата' }

  const date = `${ d.getUTCDate() } ${ months[ d.getMonth() ] } ${ d.getFullYear() }`;
  
  return ( date );

}

export {

  formatDate

};