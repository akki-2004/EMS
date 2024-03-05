// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EMS{
    // Struct to store FIR details
    struct FIR {
        string FIRId;
        string subject;
        string description;
        string date;
        string time;
        string dateOfCrime;
        string PlaceOfCrime;
    }


    // Mapping 
    mapping(string => FIR)  FIRs; //to store FIR details using a unique identifier as the key


    // Array 
    FIR[]  allFIRs;
    string[][] private EvidenceData;
    string[][] private Transactions;

    //Events
    event FIRAdded(string _FIRId, string subject, string description, string date, string time, string dateOfCrime, string PlaceOfCrime, uint256 name);

    event EvidenceDataAdded(string cnr, string id, string imageHash, string data, string fileName, string fileHash, string fileDescription,string UploadedDate,string UploadedTime );

    event AddedTransaction(string from, string to, string  amount,string date,  string time);




    //FIR

    function addFIRDetails(string memory _FIRId, string memory _subject, string memory _description, string memory _date, string memory _time, string memory _dateOfCrime, string memory _PlaceOfCrime) public {
        // Check if the FIR with the given ID already exists
        require(bytes(FIRs[_FIRId].subject).length == 0, "FIR with this ID already exists");
        require(bytes(_FIRId).length != 0, "Zero can't be ID");

        // Create a new FIR struct with the provided information
        FIR memory newFIR = FIR({
            FIRId: _FIRId,
            subject: _subject,
            description: _description,
            date: _date,
            time: _time,
            dateOfCrime: _dateOfCrime,
            PlaceOfCrime: _PlaceOfCrime
        });

        // Store the FIR details using the provided FIR ID as the key
        FIRs[_FIRId] = newFIR;

        // Append the new FIR details to the array
        allFIRs.push(newFIR);

        // Emit an event to log the addition of FIR details
        emit FIRAdded(_FIRId, _subject, _description, _date, _time, _dateOfCrime, _PlaceOfCrime, bytes(_FIRId).length);
    }

    // Function to retrieve FIR details based on the FIR ID
    function getFIRDetails(string memory _FIRId) public view returns (string memory subject, string memory description, string memory date, string memory time, string memory _dateOfCrime, string memory _PlaceOfCrime) {
        // Retrieve FIR details based on the provided FIR ID
        FIR storage fir = FIRs[_FIRId];

        // Return FIR details
        return (fir.subject, fir.description, fir.date, fir.time, fir.dateOfCrime, fir.PlaceOfCrime);
    }

    // Function to retrieve all FIR details
    function LatestFirs() public view returns (FIR[] memory) {
        FIR[] memory reverse = new FIR[](allFIRs.length);
        uint256 index = allFIRs.length;

        for (uint256 i = 0; i < allFIRs.length; i++) {
            index--;
            reverse[index] = allFIRs[i];
        }

        return reverse;
    }


    //EvidenceData

    function addData(string[] memory newArray) external {

        emit EvidenceDataAdded(newArray[0], newArray[1], newArray[2], newArray[3], newArray[4],newArray[5],newArray[6],newArray[7],newArray[8]);
        EvidenceData.push(newArray);
    }

    function getDataByCNR(string memory _cnr) external view returns (string[][] memory) {
        string[][] memory temporary = new string[][](0);

        for (uint256 i = 0; i < EvidenceData.length; i++) {
            if (keccak256(abi.encodePacked(EvidenceData[i][0])) == keccak256(abi.encodePacked(_cnr))) {
                temporary = appendToArray(temporary, EvidenceData[i]);
            }
        }

        return temporary;
    }

    // Function to append an array to another array
    function appendToArray(string[][] memory arr, string[] memory newArr) internal pure returns (string[][] memory) {
        string[][] memory result = new string[][](arr.length + 1);

        for (uint256 i = 0; i < arr.length; i++) {
            result[i] = arr[i];
        }

        result[arr.length] = newArr;

        return result;
    }


    //Transactions

    function sendMoney(string[] memory newArray) external {
        emit AddedTransaction(newArray[0],newArray[1],newArray[2],newArray[3],newArray[4]);
        Transactions.push(newArray);
    }

    function getAllTransactions(string memory _from) external view returns (string[][] memory) {
        string[][] memory temporary = new string[][](0);

        for (uint256 i = 0; i < Transactions.length; i++) {
            if (keccak256(abi.encodePacked(Transactions[i][0])) == keccak256(abi.encodePacked(_from))) {
                temporary = appendToArray(temporary, Transactions[i]);
            }
        }
        return temporary;
    }
}