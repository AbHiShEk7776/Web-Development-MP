import React, { useState, useEffect } from "react";
import { Save, Bell, Shield, User } from "lucide-react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";

const Settings = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    twoFactor: false,
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    riskTolerance: "moderate",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Retrieved token:", token);

        const response = await fetch("http://localhost:5000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleNotificationChange = (type) => {
    setUser((prevUser) => ({
      ...prevUser,
      notifications: {
        ...prevUser.notifications,
        [type]: !prevUser.notifications[type],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("Submitting user data:", user);

      const response = await axios.put("http://localhost:5000/api/user", user, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("User settings updated:", response.data);
      setUser(response.data); // Update state with new data
    } catch (error) {
      console.error("Error updating user settings:", error);
    }
  };

  const handleSecuritySubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Submitting security settings:", {
        twoFactor: user.twoFactor,
      });

      const response = await axios.put(
        "http://localhost:5000/api/user/security",
        { twoFactor: user.twoFactor },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Security settings updated:", response.data);
      setUser((prevUser) => ({ ...prevUser, ...response.data }));
    } catch (error) {
      console.error("Error updating security settings:", error);
    }
  };

  const handleNotificationsSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Submitting notification settings:", {
        notifications: user.notifications,
      });

      const response = await axios.put(
        "http://localhost:5000/api/user/notifications",
        { notifications: user.notifications },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Notification settings updated:", response.data);
      setUser((prevUser) => ({ ...prevUser, ...response.data }));
    } catch (error) {
      console.error("Error updating notification settings:", error);
    }
  };

  const handlePreferencesSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Submitting investment preferences:", {
        riskTolerance: user.riskTolerance,
      });

      const response = await axios.put(
        "http://localhost:5000/api/user/preferences",
        { riskTolerance: user.riskTolerance },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Investment preferences updated:", response.data);
      setUser((prevUser) => ({ ...prevUser, ...response.data }));
    } catch (error) {
      console.error("Error updating investment preferences:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      <Tabs defaultValue="profile">
        <TabsList className="mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account details here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="username"
                      value={user.username}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={user.email}
                      onChange={handleInputChange}
                      placeholder="Your email address"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phoneNumber"
                      value={user.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                    />
                  </div>
                  <CardFooter>
                    <Button type="submit">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security to your account.
                  </p>
                </div>
                <Switch
                  // label="Two-Factor Authentication"
                  isChecked={user.twoFactor}
                  onChange={(checked) =>
                    setUser((prevUser) => ({ ...prevUser, twoFactor: checked }))
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="button" onClick={handleSecuritySubmit}>
                <Shield className="w-4 h-4 mr-2" />
                Update Security Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to receive updates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive updates via email.
                    </p>
                  </div>
                  <Switch
                    // label="Email Notifications"
                    isChecked={user.notifications.email}
                    onChange={() => handleNotificationChange("email")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications on your device.
                    </p>
                  </div>
                  <Switch
                    // label="Push Notifications"
                    isChecked={user.notifications.push}
                    onChange={() => handleNotificationChange("push")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive SMS updates.
                    </p>
                  </div>
                  <Switch
                    // label="SMS Notifications"
                    isChecked={user.notifications.sms}
                    onChange={() => handleNotificationChange("sms")}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="button" onClick={handleNotificationsSubmit}>
                <Bell className="w-4 h-4 mr-2" />
                Update Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Investment Preferences</CardTitle>
              <CardDescription>
                Set your risk tolerance for investments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Label>Risk Tolerance</Label>
                <Select
                  options={[
                    { value: "conservative", label: "Conservative" },
                    { value: "moderate", label: "Moderate" },
                    { value: "aggressive", label: "Aggressive" },
                  ]}
                  value={user.riskTolerance}
                  onChange={(value) =>
                    setUser((prevUser) => ({
                      ...prevUser,
                      riskTolerance: value,
                    }))
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="button" onClick={handlePreferencesSubmit}>
                <User className="w-4 h-4 mr-2" />
                Update Investment Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
