import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
// import useSendMessageAuto from "../../hooks/useSendMessageAuto";
const MessageInput = () => {
	const messagesData = [
		"Hey, have you heard about the stunning beaches in Bali? It's truly a paradise!",
		"Planning a hiking trip to the Swiss Alps next month. Can't wait!",
		"Just booked tickets for a road trip across the US. So excited!",
		"Remember our amazing trip to Machu Picchu? Let's plan another adventure soon.",
		"I'm exploring Japan this summer. Any tips on must-visit places?",
		"Dreaming of exploring the Amazon rainforest someday. Nature at its best!",
		"The northern lights in Norway are absolutely magical. Must-see!",
		"Backpacking through Europe has been on my bucket list forever. Making it happen this year!",
		"Exploring the ancient ruins of Rome was like stepping back in time.",
		"Have you tried scuba diving in the Great Barrier Reef? It's an unforgettable experience!",
		"Just returned from a safari in Kenya. Saw the Big Five up close!",
		"Hiking the Grand Canyon was challenging but so rewarding. The views were breathtaking.",
		"Planning a cross-country road trip in Australia. Can't wait to explore Down Under!",
		"Spent a week island hopping in Greece. The crystal-clear waters are pure bliss.",
		"Taking a cruise through the fjords of Norway was the highlight of my year.",
		"Trekking in Nepal and reaching Everest Base Camp was the ultimate adventure.",
		"Exploring the ancient temples of Angkor Wat was a surreal experience.",
		"Witnessing the Taj Mahal at sunrise was a moment I'll cherish forever.",
		"Sailing through the Caribbean islands was the perfect getaway. Paradise found!",
		"Have you been to Iceland? The geysers and waterfalls are out of this world.",
		"Went on a hot air balloon ride over the Serengeti, and it was truly breathtaking.",
		"Tried surfing for the first time in Bali, and now I'm hooked! Gotta go back soon.",
		"Explored the ancient Mayan ruins in Mexico and felt like I was in a real-life Indiana Jones movie.",
		"Took a train through the Scottish Highlands and was mesmerized by the stunning landscapes.",
		"Went on a food tour in Vietnam and discovered so many delicious and authentic local dishes.",
		"Hiked to the top of Mount Fuji in Japan and was rewarded with a spectacular sunrise view.",
		"Snorkeled in the crystal-clear waters of the Maldives and saw the most vibrant marine life.",
		"Went on a hot air balloon ride over the Cappadocia region in Turkey, and it was magical.",
		"Visited the Galapagos Islands and was amazed by the unique wildlife and diverse ecosystems.",
		"Explored the vibrant and colorful streets of Havana, Cuba, and felt like I was in a time warp.",
		"Went on a safari in South Africa and had the privilege of seeing the Big Five up close.",
		"Hiked through the stunning landscapes of Patagonia and felt a deep connection with nature.",
		"Explored the bustling markets and ancient temples in Bangkok, Thailand, and was immersed in the culture.",
		"Went on a road trip through the American Southwest and was in awe of the breathtaking desert landscapes.",
		"Visited the stunning Cliffs of Moher in Ireland and felt a deep sense of wonder and appreciation for the natural beauty.",
		"Explored the enchanting streets of Kyoto, Japan, and felt like I had stepped back in time.",
		"Went on a hot air balloon ride over the Napa Valley and was treated to a breathtaking view of the vineyards.",
		"Hiked through the majestic Andes Mountains in Peru and was rewarded with a stunning view of Machu Picchu.",
		"Explored the vibrant and lively streets of New Orleans and was immersed in the rich culture and music.",
		"Went on a snorkeling adventure in the Great Barrier Reef and was amazed by the diverse marine life.",
		"Visited the enchanting fairy tale-like castles in Germany and felt like I was transported to a different era.",
		"Went on a culinary tour in Italy and indulged in the most delicious and authentic Italian cuisine.",
		"Explored the stunning glaciers and fjords of Patagonia and was left in awe of the raw power of nature.",
		"Visited the awe-inspiring Taj Mahal in India and was humbled by the beauty and craftsmanship of the monument.",
		"Went on a hot air balloon ride over the Cappadocia region in Turkey and was treated to a breathtaking view of the unique landscape.",
		"Explored the vibrant and colorful streets of Marrakesh, Morocco, and was immersed in the rich culture and history.",
		"Hiked through the stunning landscapes of Iceland and was amazed by the otherworldly geological formations.",
		"Went on a wildlife safari in Botswana and had the privilege of witnessing the incredible diversity of African wildlife.",
		"Explored the ancient ruins and breathtaking landscapes of Jordan, including the iconic Petra.",
		"Went on a hot air balloon ride over the Napa Valley and was treated to a breathtaking view of the rolling vineyards.",
		"Visited the stunning glaciers and fjords of Greenland and was humbled by the raw power of nature.",
		"Explored the vibrant and lively streets of New York City and was inspired by the energy and diversity of the city.",
		"Went on a snorkeling adventure in the Maldives and was amazed by the vibrant and diverse marine life.",
		"Visited the enchanting and historic castles of Scotland and felt like I had stepped back in time.",
		"Went on a culinary tour in Thailand and indulged in the most delicious and authentic Thai cuisine.",
		"Explored the stunning landscapes of Patagonia, including the majestic Torres del Paine National Park.",
		"Visited the awe-inspiring Angkor Wat in Cambodia and was humbled by the beauty and complexity of the ancient temple.",
		"Went on a hot air balloon ride over the Serengeti in Tanzania and was treated to a breathtaking view of the vast and diverse ecosystem.",
		"Explored the vibrant and colorful streets of Havana, Cuba, and was inspired by the rich culture and history.",
		"Hiked through the stunning landscapes of New Zealand and was amazed by the raw beauty of the natural world.",
		"Went on a wildlife safari in Botswana and had the privilege of witnessing the incredible diversity of African wildlife.",
		"Visited the ancient ruins and breathtaking landscapes of Peru, including the iconic Machu Picchu.",
		"Went on a hot air balloon ride over the Cappadocia region in Turkey and was treated to a breathtaking view of the unique landscape.",
		"Explored the vibrant and lively streets of Tokyo, Japan, and was inspired by the energy and modernity of the city.",
		"Went on a snorkeling adventure in the Great Barrier Reef and was amazed by the vibrant and diverse marine life.",
		"Visited the enchanting and historic castles of Germany and felt like I had stepped back in time.",
		"Went on a culinary tour in Italy and indulged in the most delicious and authentic Italian cuisine.",
		"Explored the stunning landscapes of Iceland, including the otherworldly geological formations.",
		"Visited the awe-inspiring Machu Picchu in Peru and was humbled by the beauty and complexity of the ancient Inca citadel.",
		"Went on a hot air balloon ride over the Napa Valley in California and was treated to a breathtaking view of the rolling vineyards.",
		"Explored the vibrant and colorful streets of Marrakesh, Morocco, and was immersed in the rich culture and history.",
		"Hiked through the stunning landscapes of Patagonia and was amazed by the raw power of nature.",
		"Went on a wildlife safari in South Africa and had the privilege of witnessing the incredible diversity of African wildlife.",
		"Visited the ancient ruins and breathtaking landscapes of Jordan, including the iconic Petra.",
		"Went on a hot air balloon ride over the Serengeti in Tanzania and was treated to a breathtaking view of the vast and diverse ecosystem.",
		"Explored the vibrant and lively streets of New Orleans, Louisiana, and was inspired by the rich culture and music.",
		"Went on a snorkeling adventure in the Maldives and was amazed by the vibrant and diverse marine life.",
		"Visited the enchanting and historic castles of Scotland and felt like I had stepped back in time.",
		"Went on a culinary tour in Thailand and indulged in the most delicious and authentic Thai cuisine.",
		"Explored the stunning landscapes of New Zealand and was amazed by the raw beauty of the natural world.",
		"Visited the awe-inspiring Angkor Wat in Cambodia and was humbled by the beauty and complexity of the ancient temple.",
		"Went on a hot air balloon ride over the Cappadocia region in Turkey and was treated to a breathtaking view of the unique landscape.",
		"Explored the vibrant and colorful streets of Havana, Cuba, and was inspired by the rich culture and history.",
		"Hiked through the stunning landscapes of Iceland and was amazed by the otherworldly geological formations.",
		"Went on a wildlife safari in Botswana and had the privilege of witnessing the incredible diversity of African wildlife.",
		"Visited the ancient ruins and breathtaking landscapes of Peru, including the iconic Machu Picchu.",
		"Went on a hot air balloon ride over the Napa Valley in California and was treated to a breathtaking view of the rolling vineyards.",
		"Explored the vibrant and lively streets of Tokyo, Japan, and was inspired by the energy and modernity of the city.",
		"Went on a snorkeling adventure in the Great Barrier Reef and was amazed by the vibrant and diverse marine life.",
		"Visited the enchanting and historic castles of Germany and felt like I had stepped back in time.",
		"Went on a culinary tour in Italy and indulged in the most delicious and authentic Italian cuisine.",
		"Explored the stunning landscapes of Patagonia, including the majestic Torres del Paine National Park.",
		"Visited the awe-inspiring Taj Mahal in India and was humbled by the beauty and craftsmanship of the monument.",
	];
	const getRandomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};	
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();
	// const { loading:l, sendMessageAuto} = useSendMessageAuto();
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message,messagesData[getRandomInt(0,messagesData.length-1)]);
		// await new Promise(resolve => setTimeout(resolve, 20000));
		// await sendMessageAuto(messagesData[getRandomInt(0,messagesData.length-1)]);
		setMessage("");
	};
	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{(loading) ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;