CREATE TABLE expense_tracker.expense (
    account_uuid UUID REFERENCES expense_tracker.account(account_uuid),
    uuid VARCHAR unique NOT NULL,
    date VARCHAR(50) NOT null,
    category VARCHAR(50) NOT null,
    discription VARCHAR(255),
    spend VARCHAR(255) NOT null,
    created_at VARCHAR NOT null,
    updated_at VARCHAR NOT null
);