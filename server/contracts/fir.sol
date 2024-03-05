// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FIRStorage {
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

    // Mapping to store FIR details using a unique identifier as the key
    mapping(string => FIR) public FIRs;

    // Event to log the addition of FIR details
    event FIRAdded(string  _FIRId,string subject, string description,string date, string time,string dateOfCrime,string PlaceOfCrime);

    // Function to add FIR details
    function addFIRDetails( string _FIRId,string memory _subject, string memory _description,string string memory _dateOfCrime,string memory _PlaceOfCrime) public {
        // Check if the FIR with the given ID already exists
        require(bytes(FIRs[_FIRId].subject).length == 0, "FIR with this ID already exists");
        require(_FIRId!=0,"Zero can't be ID");

        // Create a new FIR struct with the provided information
        FIR memory newFIR = FIR({
            FIRId:_FIRId,
            subject: _subject,
            description: _description,
            time:block.timestamp,
            date:block.timestamp,
            dateOfCrime: _dateOfCrime,
            PlaceOfCrime: _PlaceOfCrime
        });
        

        // Store the FIR details using the provided FIR ID as the key
        FIRs[_FIRId] = newFIR;

        // Emit an event to log the addition of FIR details
        emit FIRAdded( _FIRId,_subject,_description,block.timestamp,block.timestamp, _dateOfCrime,_PlaceOfCrime);
        
    }

    // Function to retrieve FIR details based on the FIR ID
    function getFIRDetails(string _FIRId) public view returns (string memory subject, string memory description,uint date, uint time,string memory _dateOfCrime,string memory _PlaceOfCrime) {
        // Retrieve FIR details based on the provided FIR ID
        FIR storage fir = FIRs[_FIRId];

        // Return FIR details
        return (fir.subject, fir.description,fir.date,fir.time,fir.dateOfCrime,fir.PlaceOfCrime);
    }
}