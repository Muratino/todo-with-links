export const statusStyle = (status) => {
  if (status === 'Minor') {
    return { background: '#b7db95' }
  } else if (status === 'Major') {
    return { background: 'rgb(255 249 73 / 95%)' }
  } else {
    return { background: '#F73F3F', color: '#fff' }
  }
}
