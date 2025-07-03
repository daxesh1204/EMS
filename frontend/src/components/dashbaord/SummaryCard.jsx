export const SummaryCard = ({icon,text,number,color}) => {
  return (
    <div className='rounded flex bg-slate-200 shadow-md'>
      <div className={`text-3xl flex justify-center  items-start text-white px-4 py-4 ${color}`}>
          {icon}
      </div>
      <div className='pl-4 py-1'>
        <p className='text-lg font-semibold'>{text}</p>
        <p className='text-xl font-bold'>{number}</p>
      </div>
    </div>
  )
}
