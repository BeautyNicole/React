import { LineChart } from '@/components/eCharts';

function Home() {
    return (<div>
        <LineChart title={'Line Chart2'} subTitle={'subtitle of Line Chart1'} />
        {/* <LineChart title={'Line Chart2'} subTitle={'subtitle of Line Chart2'} /> */}
    </div>);
}

export default Home;