<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $contactNo = $_POST['contactNo'];
    $contractType = $_POST['contractType'];
    $more = $_POST['more'];

    // the message
    $msg = "Hi,";
    $msg .= "\nYou have received a message from " . $name . ".\n";
    $msg .= "Their email address is " . $email . " and their phone number is " . $contactNo . "\n";
    $msg .= "They wish to talk about a contract of type " . $contractType . ".\n";
    $msg .= "More info: " . $more . ".";
    $msg .= "\n\nThanks.";

    // use wordwrap() if lines are longer than 70 characters
    $msg = wordwrap($msg, 100);

    // send email
    mail("office@woodramconstruction.co.uk", "Woodram Enquiry", $msg);
 



