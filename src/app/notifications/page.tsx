import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, Clock, AlertTriangle, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Notifications | AIGEP",
  description: "View your notifications and updates from AIGEP",
};

// Mock notifications data
const notifications = [
  {
    id: 1,
    title: "Compliance Review Due",
    description: "Your AI model Credit Scoring v2.0 requires quarterly compliance review",
    type: "warning",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Audit Request Submitted",
    description: "External auditor has requested documentation for Chatbot v2.0",
    type: "info",
    timestamp: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    title: "Certificate Expiring",
    description: "Your HR Assistant AI certification expires in 30 days",
    type: "warning",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: 4,
    title: "Compliance Check Passed",
    description: "Bias detection test completed successfully for Recommendation Engine",
    type: "success",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: 5,
    title: "New Framework Available",
    description: "EU AI Act requirements have been updated - please review",
    type: "info",
    timestamp: "3 days ago",
    read: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "error":
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    default:
      return <Bell className="h-4 w-4 text-blue-500" />;
  }
};

const getNotificationBadgeVariant = (type: string) => {
  switch (type) {
    case "warning":
      return "secondary";
    case "success":
      return "default";
    case "error":
      return "destructive";
    default:
      return "outline";
  }
};

export default function NotificationsPage() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your AI governance activities
          </p>
        </div>
        {unreadCount > 0 && (
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {unreadCount} unread
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`transition-colors hover:bg-muted/50 ${
              !notification.read ? "border-l-4 border-l-primary" : ""
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getNotificationIcon(notification.type)}
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{notification.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {notification.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={getNotificationBadgeVariant(notification.type)}
                    className="text-xs"
                  >
                    {notification.type}
                  </Badge>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {notification.timestamp}
                </p>
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <button className="text-sm text-primary hover:underline">
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notifications</h3>
            <p className="text-muted-foreground">
              You're all caught up! Check back later for updates.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}