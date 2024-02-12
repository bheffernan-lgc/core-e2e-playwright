Feature: Core user access control

    Background: Open Core and login
        Given user visits Core dashboard

    @uac
    Scenario Outline: User access control for Core Users
        When user logs in as "<User>" user
        Then user can navigate to all the "<User>" users pages
        Examples:
            | User                       |
            | Core-AdminQAUser           |
            | Core-CommercialQAUser      |
            | Core-CommercialAdminQAUser |
            | Core-DispatchQAUser        |
            | Core-DispatchAdminQAUser   |
            | Core-ProductionQAUser      |
            | Core-ProductionAdminQAUser |
            | Core-QualityQAUser         |
            | Core-QualityAdminQAUser    |
            | Core-ManufacturingQAUser   |
            | Core-DeveloperQAUser       |

    @uac
    Scenario Outline: User access control for Core Users Restricted areas
        When user logs in as "<User>" user
        And "<User>" navigates to a restricted area
        Then user is presented with an Access Denied message
        Examples:
            | User                       |
            | Core-CommercialQAUser      |
            | Core-CommercialAdminQAUser |
            | Core-DispatchQAUser        |
            | Core-DispatchAdminQAUser   |
            | Core-ProductionQAUser      |
            | Core-ProductionAdminQAUser |
            | Core-QualityQAUser         |
            | Core-QualityAdminQAUser    |
            | Core-ManufacturingQAUser   |
            | Core-DeveloperQAUser       |