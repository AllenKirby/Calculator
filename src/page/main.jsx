import bg from '../assets/images/bg.jpg'

import Container from '../components/container'

const Main = () => {
  return (
    <main className="py-14 px-2 h-screen w-full bg-cover flex items-center justify-center" style={{ backgroundImage: `url(${bg})` }}>
        <Container />
    </main>
  )
}

export default Main