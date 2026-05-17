import {useCountdown} from "../hooks/useCountdown";


function Auction({end_time}) {
    const {hours, minutes, seconds, total} = useCountdown(end_time)


    if (total <= 0) {
    return <span>Auction was over</span>;
  }

  return (
    <div className="auction-timer">
      <span className="auction-time-hrs">{hours.toString().padStart(2, "0")}</span>:
      <span className="auction-time-mins">{minutes.toString().padStart(2, "0")}</span>:
      <span className="auction-time-secs">{seconds.toString().padStart(2, "0")}</span>
    </div>
  );
}


export default Auction;
