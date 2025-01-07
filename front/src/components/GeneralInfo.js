function GeneralInfo({user}) {
  const {
    name,
    email,
    post,
    username,
    website,
    company,
    address
  } = user || {};
  const {
    catchPhrase,
    name: companyName
  } = company || {};
  const {
    city,
    street,
    suite
  } = address || {};

  return (
      <div className="client-card">
        <h1 className="client-name">{name}</h1>
        
        <div className="client-info">
            <h2>Основная информация</h2>
            <p><strong>Имя пользователя:</strong> {username}</p>
            <p><strong>Телефон:</strong> {post}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Сайт:</strong> {website}</p>
        </div>
        
        <div className="client-address">
            <h2>Адрес</h2>
            <p><strong>Улица:</strong> {street}</p>
            <p><strong>Город:</strong> {city}</p>
            <p><strong>Дом:</strong> {suite}</p>
        </div>
        
        <div className="client-work">
            <h2>Место работы</h2>
            <p><strong>Компания:</strong> {companyName}</p>
            <p><strong>Должность:</strong> {catchPhrase}</p>
        </div>
    </div>
  );
}

export default GeneralInfo;
