import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useViewport } from '../../utils/ViewportProvider'
const Key = ({ char = '', size = 1, variant = 'main', blank = false }) => {
	const textColor = variant === 'main' ? '#5D5D6A' : '#EBDFC3'
	const zColor = { 
		main: {primary:'#EBDFC3', dark:'#CFC4AC'}, 
		accent: {primary:'#5D5D6A', dark:'#464650'}, 
		special: {primary:'#946062', dark:'#734B4C'} 
	}
	const yColor = { main: '#C8B68C', accent: '#242328', special: '#5D2C26' }
	const xColor = {
		main: 'linear-gradient(to bottom, #FEFAC9, #D0BD8A)',
		accent: 'linear-gradient(to bottom, #696572, #7B7582)',
		special: 'linear-gradient(to bottom, #bc7377, #b46266)',
	}

	const { width, height } = useViewport()
	const [keyWidth, setKeyWidth] = useState()
	const [keyHeight, setKeyHeight] = useState()
	const [keyDepth, setKeyDepth] = useState()

	useEffect(() => {
		const boardWidth = width / 3
		const maxBWidth = 1280 / 3
		const calculatedWidth = boardWidth < maxBWidth ? boardWidth : maxBWidth
		const kWidth = calculatedWidth / 20
		setKeyWidth(kWidth)
		setKeyHeight(kWidth * 0.9)
		setKeyDepth(kWidth * 0.5)
		console.log(kWidth, kWidth * 0.9, kWidth * 0.5)
	})

	return (
		<Box
			className="keycap"
			component="div"
			sx={{
				height: `${keyHeight}px`,
				width: `calc(${keyWidth}px * ${size})`,
				transition: '.05s ease',
				display: 'flex',
				position: 'relative',
				justifyContent: 'center',
				alignItems: 'center',
				visibility: blank ? 'hidden' : 'visible',
			}}
		>
			<Box
				className="key-front"
				component="div"
				sx={{
					height: `100%`,
					width: `100%`,
					transform: `rotateX(-90deg) translateZ(calc(${keyHeight}px / 2))`,
					bgcolor: yColor[`${variant}`],
					position: 'absolute',
				}}
			/>
			<Box
				className="key-back"
				component="div"
				sx={{
					height: `100%`,
					width: `100%`,
					transform: `rotateX(90deg) translateZ(calc(${keyHeight}px / 2))`,
					bgcolor: yColor[`${variant}`],
					position: 'absolute',
				}}
			/>
			<Box
				className="key-right"
				component="div"
				sx={{
					height: `100%`,
					width: `calc(100% / ${size})`,
					transform: `rotateY(90deg) translateZ(calc((${keyWidth}px * ${size}) / 2))`,
					background: xColor[`${variant}`],
					position: 'absolute',
				}}
			/>
			<Box
				className="key-left"
				component="div"
				sx={{
					height: `100%`,
					width: `calc(100% / ${size})`,
					transform: `rotateY(90deg) translateZ(calc((-${keyWidth}px * ${size}) / 2))`,
					background: xColor[`${variant}`],
					position: 'absolute',
				}}
			/>
			<Box
				className="key-top"
				component="div"
				sx={{
					height: `100%`,
					width: `100%`,
					transform: `rotateY(0deg) translateZ(${keyDepth}px)`,
					bgcolor: zColor[`${variant}`].primary,
					textAlign: 'center',
					position: 'absolute',
					backgroundImage: `radial-gradient(${zColor[`${variant}`].primary} 50%, ${zColor[`${variant}`].dark})`
				}}
			>
				<Box
					className="key-text"
					component="span"
					sx={{
						fontSize: { xs: `calc(${keyWidth}px * .33)` },
						color: textColor,
						position: 'absolute',
						top: 0.75,
						left: 0.9,
					}}
				>
					{char}
				</Box>
			</Box>
			<Box
				className="key-bottom"
				component="div"
				sx={{
					height: `100%`,
					width: `100%`,
					transform: `rotateY(180deg)`,
					bgcolor: zColor[`${variant}`].primary,
					position: 'absolute',
				}}
			/>
		</Box>
	)
}

const KeyRow = (props) => {
	const { width, height } = useViewport()
	const [keyDepth, setKeyDepth] = useState()

	useEffect(() => {
		const boardWidth = width / 3
		const maxBWidth = 1280 / 3
		const calculatedWidth = boardWidth < maxBWidth ? boardWidth : maxBWidth
		const kWidth = calculatedWidth / 16
		setKeyDepth(kWidth * 0.5)
	})
	return (
		<Box
			className="key-row"
			component="div"
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				flexWrap: 'wrap',
				width: '100%',
				transform: `translateZ(calc(${keyDepth}px / 2))`,
				p: '0 2px',
			}}
		>
			{props.children}
		</Box>
	)
}

export { KeyRow, Key }
