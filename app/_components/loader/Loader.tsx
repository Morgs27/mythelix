import Image from 'next/image'

const Loader = () => {
  return (
    <div className = 'loader'>  
    <Image src="/logo-white.png" alt="Mythelix" width={100} height={100} />
    Mythelix
    </div>
  )
}

export default Loader