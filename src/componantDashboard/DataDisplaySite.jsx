import React, { useState } from 'react'
import styles from '../styleDashboard/DataDisplaySite.module.css'
import DataSiteLastNews from './DataSite/DataSiteLastNews';
import DataSiteArchief from './DataSite/DataSiteArchief';
import DataSiteSymbol from './DataSite/DataSiteSymbol';
import DataSiteBlackList from './DataSite/DataSiteBlackList';
import DataSiteSystem from './DataSite/DataSiteSystem';
import DataSiteDaaeh from './DataSite/DataSiteDaaeh';
import DataSiteQasaad from './DataSite/DataSiteQasaad';
import SearchOnAllSiteDashboard from './DataSite/SearchOnAllSiteDashboard';

export default function DataDisplaySite() {
  const [ choiceArchife, setChoiceArchife ] = useState( "lastNews" );
  const [searchDashboard,setSearchDashboard] = useState()
  function changeSearch(e) {
    const value = e.target.value;
    setSearchDashboard(value);
    if (value !== "") {
      setChoiceArchife("search");
    } else {
      setChoiceArchife("lastNews");
    }
  }
  return (
    <div>
      <div className={`headDashboard`}>
        <p> البيانات المعروضة بالموقع</p>
      </div>

      <div className={styles.filterAndDisplay}>
        <div className={styles.filter}>
          <span
            onClick={() => setChoiceArchife("lastNews")}
            className={choiceArchife === "lastNews" ? styles.active : ""}
          >
            اخر الاخبار
          </span>
          <span
            onClick={() => setChoiceArchife("archiefThowra")}
            className={choiceArchife === "archiefThowra" ? styles.active : ""}
          >
            ارشيف الثورة
          </span>
          <span
            onClick={() => setChoiceArchife("symbol")}
            className={choiceArchife === "symbol" ? styles.active : ""}
          >
            رموز الثورة
          </span>
          <span
            onClick={() => setChoiceArchife("blacklist")}
            className={choiceArchife === "blacklist" ? styles.active : ""}
          >
            القائمة السوداء
          </span>
          <span
            onClick={() => setChoiceArchife("system")}
            className={choiceArchife === "system" ? styles.active : ""}
          >
            جرائم النظام
          </span>
          <span
            onClick={() => setChoiceArchife("daaeh")}
            className={choiceArchife === "daaeh" ? styles.active : ""}
          >
            جرائم داعش
          </span>
          <span
            onClick={() => setChoiceArchife("qasad")}
            className={choiceArchife === "qasad" ? styles.active : ""}
          >
            جرائم قسد
          </span>
        </div>
        <div>
          <input
            type="text"
            className={`form-control ${styles.inputSearchDashboard}`}
            placeholder="جدول البحث هنا"
            onChange={changeSearch}
          />
        </div>
     
      </div>
      {choiceArchife === "lastNews" && <DataSiteLastNews />}
      {choiceArchife === "archiefThowra" && <DataSiteArchief />}
      {choiceArchife === "symbol" && <DataSiteSymbol />}
      {choiceArchife === "blacklist" && <DataSiteBlackList />}
      {choiceArchife === "system" && <DataSiteSystem />}
      {choiceArchife === "daaeh" && <DataSiteDaaeh />}
      {choiceArchife === "qasad" && <DataSiteQasaad />}
      {choiceArchife === "search" && (
        <SearchOnAllSiteDashboard searchDashboard={searchDashboard} />
      )}
    </div>
  );
}
