CREATE TABLE expense_tracker.limit (
    account_uuid UUID REFERENCES expense_tracker.account(account_uuid),
    expense_limit INT NOT null,
    created_at VARCHAR NOT null,
    updated_at VARCHAR NOT null
);