const GenderCheckbox = ({getGender,selectedGender}) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Male</span>
					<input value="male" checked={selectedGender=="male"} onChange={()=>getGender("male")} type='checkbox' className='checkbox border-slate-900' />
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Female</span>
					<input type='checkbox' checked={selectedGender=="female"} onChange={()=>getGender("female")} value="female" className='checkbox border-slate-900' />
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;