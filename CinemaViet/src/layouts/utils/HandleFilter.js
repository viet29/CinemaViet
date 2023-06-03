export const HandleSearchItemMovie = (item, formData) => {
  let conditions = true;

  if (formData.title) {
    conditions = conditions && item.titile.toLocaleLowerCase().includes(formData.title.toLocaleLowerCase());
  }

  if (formData.directorId > 0) {
    conditions = conditions && item.directorId === Number(formData.directorId);
  }

  if (formData.userId) {
    conditions = conditions && item.createById === formData.userId;
  }

  if (formData.releaseDate) {
    conditions = conditions && item.releaseDate === formData.releaseDate;
  }

  return conditions;
};


export const HandleSearchItemMember = (item, formData) => {
  let conditions = true;

  if (formData.email) {
    conditions = conditions && item.email.toLocaleLowerCase().includes(formData.email.toLocaleLowerCase());
  }

  if (formData.gender > 0) {
    conditions = conditions && item.gender === Number(formData.gender);
  }

  if (formData.roleId) {
    conditions = conditions && item?.roles[0]?.roleId === Number(formData.roleId);
  }

  return conditions;
};

export const HandleSearchItemMovieDay = (item, formData) => {
  let conditions = true;

  if (formData.showDate) {
    conditions = conditions && item.showDate === formData.showDate;
  }

  if (formData.roomId > 0) {
    conditions = conditions && item.roomId === Number(formData.roomId);
  }

  if (formData.movieId > 0) {
    conditions = conditions && item.movieRes.id === Number(formData.movieId);
  }

  return conditions;
};


export const HandleSearchItemBooking = (item, formData) => {
  let conditions = true;

  if (formData.showDate) {
    conditions = conditions && item.showDate === formData.showDate;
  }

  if (formData.roomId > 0) {
    conditions = conditions && item.roomId === Number(formData.roomId);
  }

  if (formData.movieId > 0) {
    conditions = conditions && item.movieRes.id === Number(formData.movieId);
  }

  if (formData.status > 0) {
    if(formData.status === 1) {
      conditions = conditions && item.status === 1  && (new Date(item.showDate+ " " + item.showTime+ ":00") >  new Date());
    }else if(formData.status === 2) {
      conditions = conditions && item.status === 2 ;
    }else if(formData.status === 3){
      conditions = conditions && item.status === 1  && (new Date(item.showDate+ " " + item.showTime+ ":00") <  new Date());
    } 
  }

  if(formData.name){
    conditions = conditions && item.userFullName.toLocaleLowerCase().includes(formData.name.toLocaleLowerCase());
  }

  if(formData.email){
    conditions = conditions && item.email.toLocaleLowerCase().includes(formData.email.toLocaleLowerCase());
  }

  return conditions;
};