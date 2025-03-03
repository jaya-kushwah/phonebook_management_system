import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';

function AddGroup() {
	const [name, setName] = useState('');
	const [group, setGroup] = useState([]);
	const [btn, setBtn] = useState(false);
	const [index, setIndex] = useState(-1);
	const cookies = new Cookies();



	useEffect(() => {
		handleShow()
	}, [])

	async function handleShow() {
		const user = cookies.get('user');
		if (user !== undefined) {

			let result = await fetch(`http://localhost:5000/group/get/${user._id}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			})

			if (result.status === 200) {
				result = await result.json();
				console.log(result.data);
				setGroup(result.data);
			}
			else if (result.status === 400) {
				result = await result.json();
				//  setError(result.error)
				setInterval(() => {
					//  setError('')
				}, 5000)
			}
		}
	}

	function handleSetName(name, i) {
		console.log(i);
		setIndex(i);
		setName(name);
		setBtn(true);
	}

	const handleUpdateGroup = async () => {
		console.log(group[index]._id);
		const response = await axios.patch(`http://localhost:5000/group/update/${group[index]._id}`,
			{
				name: name,
			}
		)
		console.log(response.status);
		if (response.status === 200) {
			setName('')
			handleShow();
		} else if (response.status === 400) {
			console.log(response.data.msg);
		}
		setBtn(false)
	};


	const deleteGroup = async (id) => {
		if (window.confirm("Are you sure you want to delete this group ?")) {
			let result = await fetch(`http://localhost:5000/group/delete/${id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
			})
			if (result.status === 200) {
				// setError(result.msg)
				// toast.success('successfully delete')
				handleShow()
			}
		}
	}


	async function handleAddGroup() {
		const user = cookies.get('user');
		// let result =await axios.post("http://localhost:5000/contact/addcontact");
		let result = await fetch("http://localhost:5000/group/add", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: name, user_id: user._id })
		})
		if (result.status === 201) {
			setName('')
		}
		else if (result.status === 400) {
			result = await result.json();
			// setError(result.error)
			setInterval(() => {
				//   setError('')
			}, 5000)
		}
		handleShow()
	}
	return (
		<div >
			<div><h3 className='text-center ' style={{ padding: '30px' }}  >Add New Group</h3></div><br />
			<div className='row' style={{ marginLeft: '31%' }}>
				<div className='col-sm-4'>
					<input type='text' value={name} name='name' placeholder='Enter your Name' className=' form-control' onChange={(e) => setName(e.target.value)} required /><br />
				</div>
				<div className='col-sm-2 ms-1 '>

					{btn === false ? <button className='btn btn-primary' onClick={handleAddGroup} style={{ marginLeft: "30%" }}>AddGroup</button> :
						<button className='btn btn-primary' onClick={handleUpdateGroup} style={{ marginLeft: "30%" }}>UpdateGroup</button>}
				</div>
			</div>
			<div className='row' style={{ marginLeft: '33%' }}>
				<div className='col-sm-4'>
					<th className="text-center" ><span >NAME 👤</span></th>
				</div>
				<div className='col-sm-2 ms-1 '>
					<th className="text-center">ACTIONS☢️</th>
				</div>
			</div>
			{group.length === 0 ? <h4 style={{ marginLeft: '40%', marginTop: '5%' }}>Group is Not Found</h4>
				:
				group.map((item, index) => {
					return <div className='row' style={{ marginLeft: '33%', marginTop: '1%' }}>
						<div className='col-sm-4'>
							{item.name}
						</div>
						<div className='col-sm-2 ms-1 '>
							<a href="#" className="table-link text-success" onClick={() => handleSetName(item.name, index)} >
								<span className="fa-stack">
									<i className="fa fa-square fa-stack-2x"></i>
									<i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
								</span>
							</a>
							<a href="#" className="table-link text-danger" onClick={() => deleteGroup(item._id)}>
								<span className="fa-stack">
									<i className="fa fa-square fa-stack-2x"></i>
									<i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
								</span>
							</a>
						</div>
					</div>
				})
			}

		</div>
	)
}

export default AddGroup