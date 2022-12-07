Feature: Take A Ticket

    Scenario: Should user order one ticket
        Given user is on "https://qamid.tmweb.ru/client/index.php"
        When user chooses day 2
        When user chooses row 1 seat 1
        When user click "button"
        Then user sees text "Вы выбрали билеты:"

    Scenario: Should user order two tickets
        Given user is on "https://qamid.tmweb.ru/client/index.php"
        When user chooses day 2
        When user chooses row 1 seat 4,5
        Then user received confirmation and qr-code

    Scenario: Should user order one VIP ticket
        Given user is on "https://qamid.tmweb.ru/client/index.php"
        When user chooses day 2
        When user chooses row 1 seat 2
        When user click "button"
        Then user sees text "Вы выбрали билеты:"