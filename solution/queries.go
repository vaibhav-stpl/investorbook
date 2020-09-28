package main

import "database/sql"

func GetFirstDegree(db *sql.DB, investorId string) ([]int, error) {
	// query
	rows, err := db.Query("select investor_id from investment where investor_id <> $1 and company_id in (select company_id from investment where investor_id = $1)",
		investorId)
	if err != nil {
		return nil, err
	}
	// close rows on exit
	defer rows.Close()

	var degreeOneConnList []int
	var degreeOneConn int
	// iterate through rows and store in variable
	for rows.Next() {
		if err = rows.Scan(&degreeOneConn); err != nil {
			return nil, err
		}
		degreeOneConnList = append(degreeOneConnList, degreeOneConn)
	}
	return degreeOneConnList, nil
}

func GetMutualConn(db *sql.DB, investorId string, otherInvestorId string) ([]int, error) {
	// query
	rows, err := db.Query("select investor_id from investment where investor_id <> $1 and investor_id <> $2 and "+
		"company_id in (select investment1.company_id from investment as investment1 inner join " +
		"investment as investment2 on investment1.company_id = investment2.company_id where "+
		"investment1.investor_id = $1 and investment2.investor_id = $2)", investorId, otherInvestorId)
	if err != nil {
		return nil, err
	}
	// close rows on exit
	defer rows.Close()

	var MutualConnList []int
	var MutualConn int
	// iterate through rows and store in variable
	for rows.Next() {
		if err = rows.Scan(&MutualConn); err != nil {
			return nil, err
		}
		MutualConnList = append(MutualConnList, MutualConn)
	}
	return MutualConnList, nil

}
