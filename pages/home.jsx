import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import Banner from '../components/HomeComponents/Banner';
import MyExpertise from '../components/HomeComponents/Expertise/MyExpertise';
// import Recommendations from '../components/HomeComponents/Recommendations/Recommendations';
// import ClientReviews from '../components/HomeComponents/ClientReviews/ClientReviews';
const Home = () => {
    const router = useRouter();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('portfolio_token');
            if (!token) {
                router.replace('/');
            }
        }
    }, []);
    return (
        <div className="Home-Page -z-10">
            <Banner />
            <MyExpertise />
            {/* <Recommendations /> */}
            {/* <ClientReviews /> */}
            <Footer />
        </div>
    )
}

export default Home; 