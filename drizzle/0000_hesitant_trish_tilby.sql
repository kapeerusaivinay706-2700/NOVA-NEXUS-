CREATE TABLE `auditRuns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`deviceId` int NOT NULL,
	`framework` varchar(120) NOT NULL,
	`status` enum('queued','running','complete','failed') NOT NULL DEFAULT 'queued',
	`passRate` int NOT NULL DEFAULT 0,
	`startedAt` timestamp,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `auditRuns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `devices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`vendor` varchar(80) NOT NULL,
	`sourceFile` varchar(255),
	`status` enum('ready','scanning','complete') NOT NULL DEFAULT 'ready',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `devices_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `evidenceRecords` (
	`id` int AUTO_INCREMENT NOT NULL,
	`auditRunId` int NOT NULL,
	`blockNumber` int NOT NULL,
	`sha256` varchar(128) NOT NULL,
	`recordType` varchar(80) NOT NULL,
	`verified` enum('yes','no') NOT NULL DEFAULT 'yes',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `evidenceRecords_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `findings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`auditRunId` int NOT NULL,
	`controlName` varchar(160) NOT NULL,
	`framework` varchar(120) NOT NULL,
	`state` enum('PASS','FAIL','UNKNOWN') NOT NULL,
	`detail` text NOT NULL,
	`remediation` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `findings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `learnedMappings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`rawCommand` text NOT NULL,
	`normalizedMeaning` varchar(255) NOT NULL,
	`confidence` int NOT NULL DEFAULT 0,
	`confirmedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `learnedMappings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
