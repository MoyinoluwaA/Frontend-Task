import React, { useState, useEffect } from 'react'
import './App.css';
import { csv } from 'd3'

const App = () => {
	const [data, setData] = useState([])
	const [sortedField, setSortedField] = useState(null)

	useEffect(() => {
		csv('cities.csv').then(data => {
			setData(data)
		})
	}, [])

	
	useEffect(() => {
		let sortedData = [...data]

		if (sortedField !== null) {
			if (sortedField === 'City' || sortedField === 'Country') {
				sortedData.sort((a, b) => {
					if (a[sortedField] < b[sortedField]) {
						return -1;
					}
					if (a[sortedField] > b[sortedField]) {
						return 1;
					}
					return 0;
				});
			} else {
				sortedData.sort((a, b) => {
					if (a[sortedField].indexOf(',') > -1 || b[sortedField].indexOf(',') > -1) {
						let aNewValue = a[sortedField].replace(',', '')
						let bNewValue = b[sortedField].replace(',', '')
						
						if (parseInt(aNewValue) < parseInt(bNewValue)) {
							return -1;
						} else if (parseInt(aNewValue) > parseInt(bNewValue)) {
							return 1;
						}
						return 0;
					}
					if (parseInt(a[sortedField]) < parseInt(b[sortedField])) {
						return -1;
					} else if (parseInt(a[sortedField]) > parseInt(b[sortedField])) {
						return 1;
					}
					return 0;
				})
					
			}
				
			setData(sortedData)
		}
	}, [sortedField])

	const handleChange = (e) => {
		let value = e.target.value
		if (value === 'City') {
			setSortedField('City')
		} else if (value === 'Country') {
			setSortedField('Country')
		} else if (value === 'All Buildings') {
			setSortedField('All\r\nBuildings')
		} else if (value === '100m+') {
			setSortedField('100m+')
		} else if (value === '150m+') {
			setSortedField('150m+')
		} else if (value === '200m+') {
			setSortedField('200m+')
		} else if (value === '300m+') {
			setSortedField('300m+')
		} else if (value === 'Telecom Towers') {
			setSortedField('Telecom\r\nTowers')
		} else if (value === 'All Structures') {
			setSortedField('All\r\nStructures')
		} 
	}

	return (
		<div className='main'>	
			<h1>Table of Cities with their number of high-rise buildings</h1>

			<div className='filter'>
				<span>Filter by:</span>
				<select name='filter' id='filters' onChange={(e) => handleChange(e)}>
					<option value='Select'>Select</option>
					<option value='City'>City</option>
					<option value='Country'>Country</option>
					<option value='All Buildings'>All Buildings</option>
					<option value='100m+'>100m+</option>
					<option value='150m+'>150m+</option>
					<option value='200m+'>200m+</option>
					<option value='300m+'>300m+</option>
					<option value='Telecom Towers'>Telecom Towers</option>
					<option value='All Structures'>All Structures</option>
				</select>
			</div>
		
			<table>
				<thead>
					<tr>
						<th>City</th>
						<th>Country</th>
						<th>All buildings</th>
						<th>100m+</th>
						<th>150m+</th>
						<th>200m+</th>
						<th>300m+</th>
						<th>Telecom Towers</th>
						<th>All structures</th>
					</tr>
				</thead>
				<tbody>
					{data.map((city, index) => {
						return (
							<tr key={index}>
								<td>{city.City}</td>
								<td>{city.Country}</td>
								<td>{city['All\r\nBuildings']}</td>
								<td>{city['100m+']}</td>
								<td>{city['150m+']}</td>
								<td>{city['200m+']}</td>
								<td>{city['300m+']}</td>
								<td>{city['Telecom\r\nTowers']}</td>
								<td>{city['All\r\nStructures']}</td>
							</tr>
						)
					})}
				</tbody>
			</table>

		</div>
	);
}

export default App;


