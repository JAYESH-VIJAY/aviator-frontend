// ===== start code from here =====

import { useBetContext } from "../ContextAndHooks/BetContext";
import LeftSidebar from "./../LeftSidebar";
import HistoryTop from "./../HistoryTop";
import StageBoard from "./../StageBoard";
import BetParent from "./../BetParent";
export default function Dashboard() {
  console.log("hi");
  const { isPlane } = useBetContext().state;
  const dummyAllResults = [{ result: 1.5 }, { result: 2.0 }, { result: 3.5 }];

  return (
    <>
      <div className="dark-bg-main overflow-x-hidden">
        {/* <header>
          <HeaderTop />
          <HeaderBottom />
        </header> */}
        <div className="main-container">
          <LeftSidebar />
          <div className="right-sidebar">
            <div className="game-play">
              <HistoryTop allresults={dummyAllResults} />
              {!isPlane ? <StageBoard /> : <PreLoader />}
              <BetParent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
