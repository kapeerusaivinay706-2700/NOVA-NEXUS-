CREATE TABLE `auditReports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`auditRunId` int NOT NULL,
	`format` varchar(30) NOT NULL,
	`status` enum('queued','ready') NOT NULL DEFAULT 'queued',
	`fileKey` varchar(255),
	`fileUrl` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `auditReports_id` PRIMARY KEY(`id`)
);
